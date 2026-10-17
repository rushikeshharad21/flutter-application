import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config.dart';

class ApiService {
  // Login: यशस्वी झाले तर user Map परत करतो, नाहीतर Exception फेकतो
  static Future<Map<String, dynamic>> login(
      String username, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );

    if (response.statusCode == 200) {
      final user = jsonDecode(response.body) as Map<String, dynamic>;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('user', jsonEncode(user));
      return user;
    } else {
      throw Exception('चुकीचे username किंवा password');
    }
  }

  // साठवलेला user वाचतो (नसेल तर null)
  static Future<Map<String, dynamic>?> getSavedUser() async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString('user');
    if (data == null) return null;
    return jsonDecode(data) as Map<String, dynamic>;
  }

  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user');
  }

  // एका student ची attendance
  static Future<List<dynamic>> getAttendance(String username) async {
    final response =
        await http.get(Uri.parse('$baseUrl/api/attendance/student/$username'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    }
    throw Exception('Attendance मिळाली नाही');
  }

  // एका student चे grades
  static Future<List<dynamic>> getGrades(String username) async {
    final response =
        await http.get(Uri.parse('$baseUrl/api/grades/student/$username'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    }
    throw Exception('Grades मिळाले नाहीत');
  }

  // सर्व notices
  static Future<List<dynamic>> getNotices() async {
    final response = await http.get(Uri.parse('$baseUrl/api/notices'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    }
    throw Exception('Notices मिळाल्या नाहीत');
  }
}