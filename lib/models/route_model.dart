class RouteModel {
  final String mode;
  final String time;
  final int cost;
  final String congestion;
  final int ecoScore;
  final bool recommended;

  RouteModel({
    required this.mode,
    required this.time,
    required this.cost,
    required this.congestion,
    required this.ecoScore,
    this.recommended = false,
  });
}

final List<RouteModel> mockRoutes = [
  RouteModel(
    mode: "Metro",
    time: "28 min",
    cost: 40,
    congestion: "Low",
    ecoScore: 92,
    recommended: true,
  ),
  RouteModel(
    mode: "Bus",
    time: "45 min",
    cost: 20,
    congestion: "Moderate",
    ecoScore: 85,
  ),
  RouteModel(
    mode: "Uber",
    time: "32 min",
    cost: 250,
    congestion: "High",
    ecoScore: 45,
  ),
];
