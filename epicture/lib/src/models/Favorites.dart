// To parse this JSON data, do
//
//     final favorites = favoritesFromJson(jsonString);

import 'dart:convert';

Favorites favoritesFromJson(String str) => Favorites.fromJson(json.decode(str));

String favoritesToJson(Favorites data) => json.encode(data.toJson());

class Favorites {
  Favorites({
    this.data,
  });

  List<Datum> data;

  factory Favorites.fromJson(Map<String, dynamic> json) => Favorites(
    data: List<Datum>.from(json["data"].map((x) => Datum.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "data": List<dynamic>.from(data.map((x) => x.toJson())),
  };
}

class Datum {
  Datum({
    this.id,
    this.title,
    this.description,
    this.cover,
    this.coverWidth,
    this.coverHeight,
    this.width,
    this.height,
    this.accountUrl,
    this.accountId,
    this.privacy,
    this.views,
    this.link,
    this.ups,
    this.downs,
    this.points,
    this.score,
    this.isAlbum,
    this.vote,
    this.favorite,
    this.nsfw,
    this.section,
    this.commentCount,
    this.favoriteCount,
    this.topic,
    this.topicId,
    this.imagesCount,
    this.datetime,
    this.inGallery,
    this.inMostViral,
    this.tags,
    this.images,
    this.hasSound,
    this.animated,
    this.type,
    this.size,
  });

  String id;
  String title;
  String description;
  String cover;
  int coverWidth;
  int coverHeight;
  int width;
  int height;
  String accountUrl;
  int accountId;
  String privacy;
  int views;
  String link;
  int ups;
  int downs;
  int points;
  int score;
  bool isAlbum;
  String vote;
  bool favorite;
  bool nsfw;
  dynamic section;
  int commentCount;
  int favoriteCount;
  String topic;
  String topicId;
  int imagesCount;
  int datetime;
  bool inGallery;
  bool inMostViral;
  dynamic tags;
  dynamic images;
  bool hasSound;
  bool animated;
  String type;
  int size;

  factory Datum.fromJson(Map<String, dynamic> json) => Datum(
    id: json["id"],
    title: json["title"],
    description: json["description"],
    cover: json["cover"],
    coverWidth: json["cover_width"],
    coverHeight: json["cover_height"],
    width: json["width"],
    height: json["height"],
    accountUrl: json["account_url"],
    accountId: json["account_id"],
    privacy: json["privacy"],
    views: json["views"],
    link: json["link"],
    ups: json["ups"],
    downs: json["downs"],
    points: json["points"],
    score: json["score"],
    isAlbum: json["is_album"],
    vote: json["vote"],
    favorite: json["favorite"],
    nsfw: json["nsfw"],
    section: json["section"],
    commentCount: json["comment_count"],
    favoriteCount: json["favorite_count"],
    topic: json["topic"],
    topicId: json["topic_id"],
    imagesCount: json["images_count"],
    datetime: json["datetime"],
    inGallery: json["in_gallery"],
    inMostViral: json["in_most_viral"],
    tags: json["tags"],
    images: json["images"],
    hasSound: json["has_sound"],
    animated: json["animated"],
    type: json["type"],
    size: json["size"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "title": title,
    "description": description,
    "cover": cover,
    "cover_width": coverWidth,
    "cover_height": coverHeight,
    "width": width,
    "height": height,
    "account_url": accountUrl,
    "account_id": accountId,
    "privacy": privacy,
    "views": views,
    "link": link,
    "ups": ups,
    "downs": downs,
    "points": points,
    "score": score,
    "is_album": isAlbum,
    "vote": vote,
    "favorite": favorite,
    "nsfw": nsfw,
    "section": section,
    "comment_count": commentCount,
    "favorite_count": favoriteCount,
    "topic": topic,
    "topic_id": topicId,
    "images_count": imagesCount,
    "datetime": datetime,
    "in_gallery": inGallery,
    "in_most_viral": inMostViral,
    "tags": tags,
    "images": images,
    "has_sound": hasSound,
    "animated": animated,
    "type": type,
    "size": size,
  };
}
