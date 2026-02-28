# Tram.AI

> **Intelligent, AI-driven urban commute planner and traffic management platform**

---

## 📌 Project Overview

Tram.AI is a full‑stack solution designed to tackle the mobility crisis in Indian cities by providing:

- **Real‑time adaptive route planning** across multi‑modal transport.
- **Traffic prediction and congestion heat‑mapping** powered by machine learning.
- **Admin console** for transport authorities and event venues.
- **Mobile‑friendly user interface** for commuters.

The platform not only helps individuals reach their destinations faster; it also promotes sustainable travel, reduces emissions, and eases burden on urban infrastructure.

---

## 🚀 Key Features

1. **Smart Commute Planner** – offers fastest, balanced and scenic routes with live traffic overlays.
2. **Dynamic Congestion Forecasting** – AI predicts traffic build‑ups hours ahead.
3. **Venue & Event Intelligence** – estimates impact zones for concerts, festivals, and sports events.
4. **Cross‑modal Integration** – integrates buses, metro, ride‑shares, and pedestrian pathways.
5. **Admin Dashboard** – public‑sector users can monitor network health, push advisories, and manage incidents.
6. **Mobile Integration** – lightweight progressive web app for commuters on the go.
7. **Sustainability Indicators** – calculates estimated fuel savings and emission reductions per trip.

---

## 🧰 Technology Stack

| Layer    | Technologies                                                       |
| -------- | ------------------------------------------------------------------ |
| Frontend | **Next.js**, TypeScript, Tailwind CSS, Framer Motion, Mapbox GL JS |
| Backend  | **FastAPI** (Python), Uvicorn, Celery for async tasks              |
| Routing  | OSRM (Open Source Routing Machine), Nominatim, Overpass API        |
| AI / ML  | LLaMA models (Groq inference), scikit‑learn, pandas                |
| Database | PostgreSQL + PostGIS, Redis cache                                  |
| Mobile   | React (as PWA) integrated with native wrappers (Android/iOS)       |
| DevOps   | Docker, GitHub Actions, Azure App Service                          |

> 📁 _Screenshots and demo assets_ are stored under `docs/screenshots/`. Add your mobile and admin integration images there like `user_mobile.png`, `admin_dashboard.png`.

---

## 📷 Demo Screenshots

Below are the screenshots you uploaded. If you want a different primary image, tell me which filename to highlight.

![Mobile 08:18:16 (1)](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.16%20%281%29.jpeg)


![Mobile 08:18:17 (1)](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.17%20%281%29.jpeg)

![Mobile 08:18:17](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.17.jpeg)

![Mobile 08:18:18 (1)](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.18%20%281%29.jpeg)

![Mobile 08:18:18](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.18.jpeg)

![Mobile 08:18:19](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.19.jpeg)

![Mobile 08:18:20](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.20.jpeg)

![Mobile 08:18:21](public/images/screenshots/WhatsApp%20Image%202026-02-28%20at%2008.18.21.jpeg)

> _Images are stored in `docs/screenshots/`. If any file is missing or you prefer `png` files, upload them and I'll update the gallery._

---

## 📊 Why Tram.AI Beats Google Maps

| Capability                                 | Tram.AI | Google Maps |
| ------------------------------------------ | ------- | ----------- |
| Real‑time AI congestion forecasting        | ✅      | ❌          |
| Venue/event impact analysis                | ✅      | ❌          |
| Multi‑modality with public transit metrics | ✅      | Partial     |
| Admin control panel                        | ✅      | ❌          |
| Sustainability & emissions estimates       | ✅      | ❌          |
| Lightweight mobile PWA                     | ✅      | ✅          |

> While Google Maps is a general‑purpose navigator, Tram.AI is tailored for urban planners and commuters in congested cities, offering predictive intelligence and administrative controls that Google cannot provide.

---

## ⚙️ Quick Start

1. **Clone repository**

   ```bash
   git clone https://github.com/<your‑org>/Tram.AI.git
   cd Tram.AI
   ```

2. **Backend setup**

   ```bash
   python -m venv venv
   source venv/Scripts/activate      # Windows
   pip install -r requirements.txt
   cd src/backend
   uvicorn main:app --reload
   ```

3. **Frontend setup**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Seed database & start OSRM**
   - run `scripts/setup_db.sh` and `scripts/start_osrm.sh` (see `Implementation.md`).

5. **Mobile app**
   - open `android/` in Android Studio or run PWA from the browser.

6. **Admin console** available at `http://localhost:3000/admin`.

> 🔧 For production, build docker images and deploy via Docker Compose or Azure DevOps pipelines (see `azure-pipelines.yml`).

---

## 🌱 Conclusion

Tram.AI is more than a navigation tool; it's a **sustainable mobility platform** built for the realities of modern Indian cities. By combining AI forecasting, multi‑modal planning, and admin oversight, we help reduce congestion, cut emissions, and make urban travel smarter. Our solution addresses real‑world pain points—lost productivity, degraded air quality, and fragmented transit systems—while keeping an eye on environmental stewardship and the health of urban ecosystems.

Let’s move cities forward, one intelligent route at a time.
