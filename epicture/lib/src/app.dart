import 'dart:ui';
import 'package:epitech_project/src/components/RoundedButton.dart';
import 'package:epitech_project/src/constants/constants.dart';
import 'package:epitech_project/src/ui/Homepage/homepage_home.dart';
import 'package:epitech_project/src/ui/connexion.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'ui/homepage.dart';

var globalAccessToken = "";
var globalClientId = "a14de0322afe7eb";
var globalUsername = "";

class App extends StatefulWidget {

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  var _isConnected = false;

  final myController = TextEditingController();
  @override
  void initState() {
    super.initState();
    findPrefs();
  }
  void findPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final name = prefs.getString('account_username');
    final accessToken = prefs.getString('access_token');
    if (name == null) {
      return;
    }
    globalUsername = name;
    globalAccessToken = accessToken;
    setState(() {
     _isConnected = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isConnected) {
      return MaterialApp(
          key: _scaffoldKey,
          home: Homepage()
      );
    } else {
      return MaterialApp(
        home: Connexion()
      );
    }

  }
}