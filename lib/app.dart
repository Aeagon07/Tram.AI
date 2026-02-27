import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'features/home/home_page.dart';
import 'features/routes/routes_page.dart';
import 'features/sustainability/sustainability_page.dart';
import 'features/alerts/alerts_page.dart';
import 'features/profile/profile_page.dart';

final GoRouter _router = GoRouter(
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (context, state, child) {
        return Scaffold(
          body: child,
          bottomNavigationBar: _AumisNavBar(currentPath: state.fullPath ?? '/'),
        );
      },
      routes: [
        GoRoute(path: '/', builder: (context, state) => const HomePage()),
        GoRoute(path: '/routes', builder: (context, state) => const RoutesPage()),
        GoRoute(path: '/sustainability', builder: (context, state) => const SustainabilityPage()),
        GoRoute(path: '/alerts', builder: (context, state) => const AlertsPage()),
        GoRoute(path: '/profile', builder: (context, state) => const ProfilePage()),
      ],
    ),
  ],
);

class _AumisNavBar extends StatelessWidget {
  final String currentPath;
  const _AumisNavBar({required this.currentPath});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _getIndex(currentPath),
      onTap: (index) => context.go(_getPath(index)),
      type: BottomNavigationBarType.fixed,
      backgroundColor: const Color(0xFF020C1B),
      selectedItemColor: const Color(0xFF64FFDA),
      unselectedItemColor: Colors.white54,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.directions), label: 'Routes'),
        BottomNavigationBarItem(icon: Icon(Icons.eco), label: 'Sustainability'),
        BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Alerts'),
        BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
      ],
    );
  }

  int _getIndex(String path) {
    if (path == '/') return 0;
    if (path.startsWith('/routes')) return 1;
    if (path.startsWith('/sustainability')) return 2;
    if (path.startsWith('/alerts')) return 3;
    if (path.startsWith('/profile')) return 4;
    return 0;
  }

  String _getPath(int index) {
    switch (index) {
      case 0: return '/';
      case 1: return '/routes';
      case 2: return '/sustainability';
      case 3: return '/alerts';
      case 4: return '/profile';
      default: return '/';
    }
  }
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      title: 'AUMIS',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
    );
  }
}
