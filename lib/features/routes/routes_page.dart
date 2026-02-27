import 'package:flutter/material.dart';
import '../../models/route_model.dart';
import '../../core/theme/colors.dart';

class RoutesPage extends StatelessWidget {
  const RoutesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Routes'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: mockRoutes.length,
        itemBuilder: (context, index) {
          final route = mockRoutes[index];
          return _RouteCard(route: route);
        },
      ),
    );
  }
}

class _RouteCard extends StatelessWidget {
  final RouteModel route;
  const _RouteCard({required this.route});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(_getIcon(route.mode), color: AppColors.accentBlue),
                    const SizedBox(width: 12),
                    Text(route.mode, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  ],
                ),
                Text(route.time, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.accentBlue)),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Cost: ₹${route.cost}', style: const TextStyle(color: Colors.white70)),
                _EcoBadge(score: route.ecoScore),
              ],
            ),
          ],
        ),
      ),
    );
  }

  IconData _getIcon(String mode) {
    switch (mode.toLowerCase()) {
      case 'metro': return Icons.directions_subway;
      case 'bus': return Icons.directions_bus;
      case 'uber': return Icons.directions_car;
      default: return Icons.directions;
    }
  }
}

class _EcoBadge extends StatelessWidget {
  final int score;
  const _EcoBadge({required this.score});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.ecoGreen.withOpacity(0.2),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.ecoGreen.withOpacity(0.5)),
      ),
      child: Text('Eco: $score', style: const TextStyle(color: AppColors.ecoGreen, fontWeight: FontWeight.bold, fontSize: 12)),
    );
  }
}
