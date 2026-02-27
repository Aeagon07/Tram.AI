import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';

class AlertsPage extends StatelessWidget {
  const AlertsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Live Alerts'), backgroundColor: Colors.transparent, elevation: 0),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          _AlertCard(
            title: 'Accident Detected',
            subtitle: 'Bannerghatta Rd (2.1 km away)',
            type: 'Critical',
          ),
          _AlertCard(
            title: 'Congestion Spike',
            subtitle: 'Silk Board Junction (Alternative available)',
            type: 'Warning',
          ),
          _AlertCard(
            title: 'Rain Expected',
            subtitle: 'Expect slower traffic in 30 mins',
            type: 'Info',
          ),
        ],
      ),
    );
  }
}

class _AlertCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String type;
  const _AlertCard({required this.title, required this.subtitle, required this.type});

  @override
  Widget build(BuildContext context) {
    Color color = type == 'Critical' ? AppColors.alertRed : (type == 'Warning' ? Colors.orange : AppColors.accentBlue);
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(Icons.warning_amber_rounded, color: color),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle, style: const TextStyle(color: Colors.white70)),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
      ),
    );
  }
}
