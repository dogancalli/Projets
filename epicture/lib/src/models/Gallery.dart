// To parse this JSON data, do
//
//     final usersImg = usersImgFromJson(jsonString);
import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:convert' as convert;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import 'CommentList.dart';
import 'GalleryList.dart';
import 'Imgur.dart';
//
// UsersImg usersImgFromJson(String str) => UsersImg.fromJson(json.decode(str));
//
// String usersImgToJson(UsersImg data) => json.encode(data.toJson());

// class UsersImg {
//   UsersImg({
//     this.data,
//     this.success,
//     this.status,
//   });
//
//   List<Datum> data;
//   bool success;
//   int status;
//
//   factory UsersImg.fromJson(Map<String, dynamic> json) => UsersImg(
//     data: List<Datum>.from(json["data"].map((x) => Datum.fromJson(x))),
//     success: json["success"],
//     status: json["status"],
//   );
//
//   Map<String, dynamic> toJson() => {
//     "data": List<dynamic>.from(data.map((x) => x.toJson())),
//     "success": success,
//     "status": status,
//   };
// }
//
// class Datum {
//   Datum({
//     this.id,
//     this.title,
//     this.description,
//     this.datetime,
//     this.type,
//     this.animated,
//     this.width,
//     this.height,
//     this.size,
//     this.views,
//     this.bandwidth,
//     this.vote,
//     this.favorite,
//     this.nsfw,
//     this.section,
//     this.accountUrl,
//     this.accountId,
//     this.isAd,
//     this.inMostViral,
//     this.hasSound,
//     this.tags,
//     this.adType,
//     this.adUrl,
//     this.edited,
//     this.inGallery,
//     this.deletehash,
//     this.name,
//     this.link,
//   });
//
//   String id;
//   String title;
//   String description;
//   int datetime;
//   String type;
//   bool animated;
//   int width;
//   int height;
//   int size;
//   int views;
//   int bandwidth;
//   dynamic vote;
//   bool favorite;
//   dynamic nsfw;
//   dynamic section;
//   String accountUrl;
//   int accountId;
//   bool isAd;
//   bool inMostViral;
//   bool hasSound;
//   List<dynamic> tags;
//   int adType;
//   String adUrl;
//   String edited;
//   bool inGallery;
//   String deletehash;
//   String name;
//   String link;
//
//   factory Datum.fromJson(Map<String, dynamic> json) => Datum(
//     id: json["id"],
//     title: json["title"],
//     description: json["description"] == null ? null : json["description"],
//     datetime: json["datetime"],
//     type: json["type"],
//     animated: json["animated"],
//     width: json["width"],
//     height: json["height"],
//     size: json["size"],
//     views: json["views"],
//     bandwidth: json["bandwidth"],
//     vote: json["vote"],
//     favorite: json["favorite"],
//     nsfw: json["nsfw"],
//     section: json["section"],
//     accountUrl: json["account_url"],
//     accountId: json["account_id"],
//     isAd: json["is_ad"],
//     inMostViral: json["in_most_viral"],
//     hasSound: json["has_sound"],
//     tags: List<dynamic>.from(json["tags"].map((x) => x)),
//     adType: json["ad_type"],
//     adUrl: json["ad_url"],
//     edited: json["edited"],
//     inGallery: json["in_gallery"],
//     deletehash: json["deletehash"],
//     name: json["name"],
//     link: json["link"],
//   );
//
//   Map<String, dynamic> toJson() => {
//     "id": id,
//     "title": title,
//     "description": description == null ? null : description,
//     "datetime": datetime,
//     "type": type,
//     "animated": animated,
//     "width": width,
//     "height": height,
//     "size": size,
//     "views": views,
//     "bandwidth": bandwidth,
//     "vote": vote,
//     "favorite": favorite,
//     "nsfw": nsfw,
//     "section": section,
//     "account_url": accountUrl,
//     "account_id": accountId,
//     "is_ad": isAd,
//     "in_most_viral": inMostViral,
//     "has_sound": hasSound,
//     "tags": List<dynamic>.from(tags.map((x) => x)),
//     "ad_type": adType,
//     "ad_url": adUrl,
//     "edited": edited,
//     "in_gallery": inGallery,
//     "deletehash": deletehash,
//     "name": name,
//     "link": link,
//   };
// }

class Gallery extends Imgur {

  Future<GalleryList> getGallery(Map<String, String> requestKeys, Map<String, bool> queries) async {

    var sharedPreferences = await SharedPreferences.getInstance();

    var url =  requestKeys["section"] + "/" + requestKeys["sort"]
        + "/" + requestKeys["window"] + "/" + requestKeys["page"];

    var queryUrl = "?showViral=" + queries["showViral"].toString()
        + "&mature=" + queries["showMature"].toString()
        + "&album_previews=" + queries["albumPreviews"].toString();

    var response = await http.get(
        this.baseUrl + "/gallery/" + url + queryUrl,
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

  Future<GalleryList> getGalleryResearch(String search, String sort, String window) async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var url =  "/" + sort + "/" + window + "/1";
    var queryUrl = "?q=" + search;

    var response = await http.get(
        this.baseUrl + "/gallery/search" + url + queryUrl,
        headers: {
          "Authorization": "Client-ID " + sharedPreferences.getString("account_id")
        }
    );

    if (response.statusCode == 200) {
      var json = convert.jsonDecode(response.body);
      return GalleryList.fromJson(json);
    } else {
      return null;
    }
  }

  Future<Map<String, dynamic>> voteImage(String hash, String voteType) async {
    var sharedPreferences = await SharedPreferences.getInstance();

    if (!["up", "down"].contains(voteType))
      return null;

    var response = await http.post(
        this.baseUrl + "/gallery/" + hash + "/vote/" + voteType,
        headers: {
          "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
        }
    );

    if (response.statusCode == 200) {
      var json = convert.jsonDecode(response.body);
      return json;
    } else {
      return null;
    }
  }

  Future<CommentList> getImageComments(String imageHash, String sort) async {
    var sharedPreferences = await SharedPreferences.getInstance();

    var response = await http.get(
        this.baseUrl + "/gallery/" + imageHash + "/comments/" + sort,
        headers: {
          "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
        }
    );

    print(response.body);

    if (response.statusCode == 200) {
      var json = convert.jsonDecode(response.body);
      return CommentList.fromJson(json);
    } else {
      return null;
    }
  }


  sendPicture(File _image) async{
    var sharedPreferences = await SharedPreferences.getInstance();
    var imageEncoded = base64Encode(_image.readAsBytesSync());
    var headers = {
      "Authorization": "Bearer " + sharedPreferences.getString("user_access_token")
    };
    var request = http.MultipartRequest('POST', Uri.parse('https://api.imgur.com/3/image'));
    request.fields.addAll({
      'image': imageEncoded , 'name':'test',"type": "base64"
    });

    request.headers.addAll(headers);

    http.StreamedResponse response = await request.send();

    if (response.statusCode == 200) {
      print(await response.stream.bytesToString());
      print('account_id = '+ sharedPreferences.getString("account_id"));
      print("Bearer " + sharedPreferences.getString("user_access_token"));
    }
    else {
      print(response.reasonPhrase);
    }
  }


}