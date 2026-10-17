import 'package:flutter/material.dart';
import '../services/api_service.dart';

class GradesScreen extends StatelessWidget {
  final String username;
  const GradesScreen({super.key, required this.username});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<dynamic>>(
      future: ApiService.getGrades(username),
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
          return const Center(child: Text('अजून grades नाहीत'));
        }

        final totalMarks =
            items.fold<int>(0, (sum, g) => sum + (g['marks'] as int));
        final totalMax =
            items.fold<int>(0, (sum, g) => sum + (g['maxMarks'] as int));
        final percent = totalMax == 0
            ? '0.0'
            : (totalMarks * 100 / totalMax).toStringAsFixed(1);

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
                      const Text('Overall'),
                    ]),
                    Column(children: [
                      Text('$totalMarks / $totalMax',
                          style: const TextStyle(
                              fontSize: 28, fontWeight: FontWeight.bold)),
                      const Text('Total Marks'),
                    ]),
                  ],
                ),
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: items.length,
                itemBuilder: (context, i) {
                  final g = items[i];
                  return ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.deepPurple,
                      child: Text(
                        g['grade'] ?? '',
                        style: const TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                    title: Text(g['subject'] ?? ''),
                    subtitle: Text('${g['marks']} / ${g['maxMarks']}'),
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