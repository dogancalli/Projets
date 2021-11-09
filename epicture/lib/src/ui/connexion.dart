import 'package:epitech_project/src/components/RoundedButton.dart';
import 'package:epitech_project/src/ui/Homepage/homepage_home.dart';
import 'package:epitech_project/src/ui/homepage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../constants/constants.dart';
import 'dart:async';

class Connexion extends StatefulWidget {
  Connexion({Key key}) : super(key: key);

  @override
  _Connexion createState() => _Connexion();
}

class _Connexion extends State<Connexion> {

  bool isLoggedIn = false;

  final String clientId = "a84bd9126d7a292";
  final String responseType = "token";

  final webViewPlugin = new FlutterWebviewPlugin();

  @override
  void initState() {
    super.initState();

    webViewPlugin.onStateChanged.listen((WebViewStateChanged state) {
      //print("onStateChanged: ${state.type} ${state.url}");

      var uri = Uri.parse(state.url.replaceFirst('#', '?'));

      if (uri.query.contains('access_token')) {
        webViewPlugin.close();

        SharedPreferences.getInstance().then((SharedPreferences prefs) {
          print(state.url);
          print("SHARED: " + uri.queryParameters["access_token"]);
          prefs.setString('user_access_token', uri.queryParameters["access_token"]);
          prefs.setString('user_refresh_token', uri.queryParameters["refresh_token"]);
          prefs.setString('user_account_name', uri.queryParameters["account_username"]);
          prefs.setString('account_id', clientId);
          //prefs.setInt('user_access_token_expires', int.parse(uri.queryParameters["expires_in"]));

          setState(() {
            this.isLoggedIn = true;
          });
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!this.isLoggedIn) {
      return WebviewScaffold(
          url: "https://api.imgur.com/oauth2/authorize?client_id=" + clientId +
              "&response_type=" + responseType,
          appBar: PreferredSize(
            preferredSize: Size.fromHeight(40),
            child: AppBar(
              backgroundColor: Colors.lightBlueAccent,
              title: Text("Connexion"),
            ),
          )
      );
    } else {
      return Homepage();
    }
  }
}