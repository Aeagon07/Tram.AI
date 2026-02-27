import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 40),
            const CircleAvatar(radius: 50, backgroundColor: AppColors.accentBlue, child: Icon(Icons.person, size: 50, color: Colors.black)),
            const SizedBox(height: 16),
            const Text('John Doe', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const Text('Eco-Warrior Level 4', style: TextStyle(color: AppColors.ecoGreen)),
            const SizedBox(height: 40),
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    _ProfileTile(icon: Icons.history, label: 'Trip History'),
                    _ProfileTile(icon: Icons.favorite_border, label: 'Saved Routes'),
                    _ProfileTile(icon: Icons.settings, label: 'App Settings'),
                    const Spacer(),
                    TextButton(onPressed: () {}, child: const Text('Logout', style: TextStyle(color: AppColors.alertRed))),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ProfileTile extends StatelessWidget {
  final IconData icon;
  final String label;
  const _ProfileTile({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: AppColors.accentBlue),
      title: Text(label),
      trailing: const Icon(Icons.chevron_right),
    );
  }
}
