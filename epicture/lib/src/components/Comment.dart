import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

import '../models/Imgur.dart';

class Comment extends Imgur {

  /// Future<Map<String, dynamic>> voteComment
  /// curl --location --request GET "https://api.imgur.com/3/comment/commentId/vote/ups" \
  ///  --header "Authorization: Client-ID {{clientId}}"
  /// Map
  Future<Map<String, dynamic>> voteComment(dynamic commentId, String vote) async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var response = await http.get(
        this.baseUrl + "/comment/" + commentId.toString() + "/vote/" + vote,
        headers: {
          "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
        }
    );

    if (response.statusCode == 200) {
      return convert.jsonDecode(response.body);
    } else {
      return null;
    }
  }

  Future<Map<String, dynamic>> postComment(String comment, String imageId) async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var response = await http.post(
        this.baseUrl + "/comment/",
        headers: {
          "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
        },
        body: {
          "image_id": imageId,
          "comment": comment
        }
    );

    print(response.body);

    if (response.statusCode == 200) {
      return convert.jsonDecode(response.body);
    } else {
      return null;
    }
  }
}