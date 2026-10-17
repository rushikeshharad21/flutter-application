import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'login_screen.dart';
import 'attendance_screen.dart';
import 'grades_screen.dart';
import 'notices_screen.dart';

class HomeScreen extends StatefulWidget {
  final Map<String, dynamic> user;
  const HomeScreen({super.key, required this.user});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    final username = widget.user['username'] as String;

    final pages = [
      AttendanceScreen(username: username),
      GradesScreen(username: username),
      const NoticesScreen(),
    ];
    const titles = ['Attendance', 'Grades', 'Notices'];

    return Scaffold(
      appBar: AppBar(
        title: Text('${titles[_index]}  •  $username'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () async {
              await ApiService.logout();
              if (!context.mounted) return;
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (_) => const LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: pages[_index],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: const [
          NavigationDestination(
              icon: Icon(Icons.fact_check), label: 'Attendance'),
          NavigationDestination(icon: Icon(Icons.grade), label: 'Grades'),
          NavigationDestination(icon: Icon(Icons.campaign), label: 'Notices'),
        ],
      ),
    );
  }
}