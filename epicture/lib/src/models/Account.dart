import 'package:epitech_project/src/models/AccountBase.dart';
import 'package:epitech_project/src/models/Imgur.dart';
import 'package:epitech_project/src/models/GalleryList.dart';

import 'package:http/http.dart' as http;
import 'dart:convert' as convert;
import 'package:shared_preferences/shared_preferences.dart';

class Account extends Imgur {

  Future<AccountBase> getAccountBase() async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var response = await http.get(
        this.baseUrl + "/account/" + sharedPreferences.getString("user_account_name"),
        headers: {
          "Authorization": "Client-ID " + sharedPreferences.getString("account_id")
        }
    );

    if (response.statusCode == 200) {
      var json = convert.jsonDecode(response.body);
      return AccountBase.fromJson(json["data"]);
    } else {
      return null;
    }
  }

  Future<GalleryList> getAccountImages() async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var response = await http.get(
        this.baseUrl + "/account/me/images",
        headers: {
          "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
        }
    );

    if (response.statusCode == 200) {
      var json = convert.jsonDecode(response.body);
      return GalleryList.fromJson(json);
    } else {
      return null;
    }
  }

  Future<int> getAccountPublicationsCount() async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var response = await http.get(
        this.baseUrl + "/account/" + sharedPreferences.getString("user_account_name") + "/images/count",
        headers: {
          "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
        }
    );

    if (response.statusCode == 200) {
      var json = convert.jsonDecode(response.body);
      return json["data"];
    } else {
      return null;
    }
  }

  Future<GalleryList> getGalleryFavorites() async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var response = await http.get(
        this.baseUrl + "/account/" + sharedPreferences.getString("user_account_name")
            + "/favorites",
        headers: {
          "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
        }
    );

    if (response.statusCode == 200) {
      var json = convert.jsonDecode(response.body);
      return GalleryList.fromJson(json);
    } else {
      return null;
    }
  }

  Future<void> logout() async {
    var sharedPreferences = await SharedPreferences.getInstance();

    return await http.post(
        this.baseImgurUrl + "/logout?client_id=" + sharedPreferences.getString("account_id")
    );
    ;
  }
}