import 'package:flutter/material.dart';
import '../services/api_service.dart';

class AttendanceScreen extends StatelessWidget {
  final String username;
  const AttendanceScreen({super.key, required this.username});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<dynamic>>(
      future: ApiService.getAttendance(username),
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(
            child: Text('एरर: ${snapshot.error}',
                style: const TextStyle(color: Colors.red)),
          );
        }
        final items = snapshot.data ?? [];
        if (items.isEmpty) {
          return const Center(child: Text('अजून attendance नोंद नाही'));
        }

        final total = items.length;
        final present = items.where((a) => a['status'] == 'PRESENT').length;
        final percent = (present * 100 / total).toStringAsFixed(1);

        return Column(
          children: [
            Card(
              margin: const EdgeInsets.all(12),
              color: Colors.deepPurple.shade50,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column(children: [
                      Text('$percent%',
                          style: const TextStyle(
                              fontSize: 28, fontWeight: FontWeight.bold)),
                      const Text('Attendance'),
                    ]),
                    Column(children: [
                      Text('$present / $total',
                          style: const TextStyle(
                              fontSize: 28, fontWeight: FontWeight.bold)),
                      const Text('Present / Total'),
                    ]),
                  ],
                ),
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: items.length,
                itemBuilder: (context, i) {
                  final a = items[i];
                  final isPresent = a['status'] == 'PRESENT';
                  return ListTile(
                    leading: Icon(
                      isPresent ? Icons.check_circle : Icons.cancel,
                      color: isPresent ? Colors.green : Colors.red,
                    ),
                    title: Text(a['subject'] ?? ''),
                    subtitle: Text(a['date'] ?? ''),
                    trailing: Text(
                      a['status'] ?? '',
                      style: TextStyle(
                        color: isPresent ? Colors.green : Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        );
      },
    );
  }
}