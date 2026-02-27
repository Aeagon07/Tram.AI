from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
import re

# Try to import DB and application models. If the project's `app` package
# is not available in this environment, provide a graceful fallback so the
# chat endpoint can still run (returns generic replies).
try:
    from app.database import SessionLocal
    from app import models, services  # your existing services
    from app.services import route_optimizer, fare_calculator, alert  # adjust imports
except Exception:
    SessionLocal = None
    models = None
    services = None
    route_optimizer = None
    fare_calculator = None
    alert = None

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str
    data: Optional[dict] = None


def get_db():
    if SessionLocal:
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()
    else:
        # Fallback fake DB: returns empty lists / None for queries
        class FakeQuery:
            def __init__(self, items=None):
                self._items = items or []

            def all(self):
                return self._items

            def first(self):
                return self._items[0] if self._items else None

            def filter_by(self, **kwargs):
                return self


        class FakeDB:
            def query(self, *args, **kwargs):
                return FakeQuery([])

            def close(self):
                pass

        db = FakeDB()
        yield db


def handle_traffic_query(message: str, db: Session) -> str:
    """Extract route name and return traffic status."""
    # List all route names from DB
    try:
        routes = db.query(models.Route).all()
    except Exception:
        routes = []

    route_names = {getattr(r, 'name', '').lower(): r for r in routes}

    # Check if any route name appears in message
    for name_lower, route in route_names.items():
        if name_lower and name_lower in message.lower():
            traffic = db.query(models.TrafficStatus).filter_by(route_id=getattr(route, 'id', None)).first()
            if traffic:
                return f"On {getattr(route, 'name', 'route')}, traffic is {getattr(traffic, 'congestion_level', 'unknown')} (avg speed {getattr(traffic, 'avg_speed', 'N/A')} km/h)."
            else:
                return f"Traffic data for {getattr(route, 'name', 'route')} is not available."

    # No specific route mentioned → give summary of all routes
    try:
        all_status = db.query(models.TrafficStatus).all()
    except Exception:
        all_status = []

    if not all_status:
        return "No traffic data available."
    summary = "\n".join([f"- Route {getattr(s, 'route_id', '?')}: {getattr(s, 'congestion_level', '?')}" for s in all_status])
    return f"Current traffic status:\n{summary}"


def handle_incident_query(message: str, db: Session) -> str:
    """Return active incidents, optionally filter by location."""
    try:
        active = db.query(models.Incident).filter_by(resolved=False).all()
    except Exception:
        active = []

    if not active:
        return "No active incidents reported."

    incidents_list = []
    for inc in active:
        incidents_list.append(
            f"- {getattr(inc, 'description', 'incident')} at ({getattr(inc, 'latitude', 0):.4f}, {getattr(inc, 'longitude', 0):.4f}) [severity: {getattr(inc, 'severity', 'N/A')}]"
        )
    return "Active incidents:\n" + "\n".join(incidents_list)


def handle_route_query(message: str, db: Session) -> str:
    """Placeholder for route planning – will be enhanced later."""
    return (
        "To plan a route, please provide your starting point and destination. "
        "For example: 'route from FC Road to Hinjawadi'.\n"
        "I'll then show you options with traffic and fares."
    )


def handle_fare_query(message: str, db: Session) -> str:
    """Give general fare info or estimate for a route."""
    return (
        "Fare estimation:\n"
        "- Car: approx ₹10/km + extra during heavy traffic.\n"
        "- Metro: ₹10 base + ₹2/km.\n"
        "If you tell me the route, I can calculate a more precise fare."
    )


def handle_report_query(message: str, db: Session) -> str:
    """Initiate incident reporting."""
    return (
        "To report an incident, please use the 'Report Incident' button on the map, "
        "or provide details (location, description) in your next message and I'll log it."
    )


def process_message(message: str, db: Session) -> str:
    msg_lower = message.lower()

    # Simple keyword-based routing
    if any(word in msg_lower for word in ["traffic", "congestion"]):
        return handle_traffic_query(message, db)
    elif any(word in msg_lower for word in ["accident", "incident", "crash"]):
        return handle_incident_query(message, db)
    elif any(word in msg_lower for word in ["route", "way", "direction", "from", "to"]):
        return handle_route_query(message, db)
    elif any(word in msg_lower for word in ["fare", "cost", "price"]):
        return handle_fare_query(message, db)
    elif "report" in msg_lower and any(word in msg_lower for word in ["accident", "incident"]):
        return handle_report_query(message, db)
    else:
        return (
            "I can help with:\n"
            "• Traffic on a specific route (e.g., 'traffic on FC Road')\n"
            "• Active incidents (e.g., 'any accidents near Shivajinagar?')\n"
            "• Route planning (e.g., 'route from A to B')\n"
            "• Fare estimation (e.g., 'cost by car from A to B')\n"
            "• Reporting an incident (e.g., 'report accident at JM Road')\n"
            "Please try one of these."
        )


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        response_text = process_message(request.message, db)
        return ChatResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
