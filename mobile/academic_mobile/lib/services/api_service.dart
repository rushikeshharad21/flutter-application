import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config.dart';

class ApiService {
  static Map<String, dynamic>? _user;

  static Future<Map<String, dynamic>> login(
      String username, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );
    if (response.statusCode == 200) {
      _user = jsonDecode(response.body) as Map<String, dynamic>;
      return _user!;
    }
    throw Exception('चुकीचे username किंवा password');
  }

  static Future<Map<String, dynamic>?> getSavedUser() async => _user;

  static Future<void> logout() async {
    _user = null;
  }

  static Future<List<dynamic>> getAttendance(String username) async {
    final r =
        await http.get(Uri.parse('$baseUrl/api/attendance/student/$username'));
    if (r.statusCode == 200) return jsonDecode(r.body) as List<dynamic>;
    throw Exception('Attendance मिळाली नाही');
  }

  static Future<List<dynamic>> getGrades(String username) async {
    final r =
        await http.get(Uri.parse('$baseUrl/api/grades/student/$username'));
    if (r.statusCode == 200) return jsonDecode(r.body) as List<dynamic>;
    throw Exception('Grades मिळाले नाहीत');
  }

  static Future<List<dynamic>> getNotices() async {
    final r = await http.get(Uri.parse('$baseUrl/api/notices'));
    if (r.statusCode == 200) return jsonDecode(r.body) as List<dynamic>;
    throw Exception('Notices मिळाल्या नाहीत');
  }
}