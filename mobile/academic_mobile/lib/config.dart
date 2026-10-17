import 'package:flutter/foundation.dart' show kIsWeb, defaultTargetPlatform, TargetPlatform;

// Backend चा पत्ता प्लॅटफॉर्मनुसार ठरतो.
String get baseUrl {
  if (kIsWeb) {
    return 'http://localhost:8080';
  }
  if (defaultTargetPlatform == TargetPlatform.android) {
    // Android emulator: 10.0.2.2 = PC चा localhost
    // खरा फोन: PC चा IP टाका, उदा. http://192.168.1.5:8080
    return 'http://10.0.2.2:8080';
  }
  return 'http://localhost:8080';
}