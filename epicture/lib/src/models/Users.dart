// To parse this JSON data, do
//
//     final users = usersFromJson(jsonString);

import 'dart:convert';

Users usersFromJson(String str) => Users.fromJson(json.decode(str));

String usersToJson(Users data) => json.encode(data.toJson());

class Users {
  Users({
    this.data,
    this.success,
    this.status,
  });

  Data data;
  bool success;
  int status;

  factory Users.fromJson(Map<String, dynamic> json) => Users(
    data: Data.fromJson(json["data"]),
    success: json["success"],
    status: json["status"],
  );

  Map<String, dynamic> toJson() => {
    "data": data.toJson(),
    "success": success,
    "status": status,
  };
}

class Data {
  Data({
    this.accountUrl,
    this.email,
    this.avatar,
    this.cover,
    this.publicImages,
    this.albumPrivacy,
    this.proExpiration,
    this.acceptedGalleryTerms,
    this.activeEmails,
    this.messagingEnabled,
    this.commentReplies,
    this.blockedUsers,
    this.showMature,
    this.newsletterSubscribed,
    this.firstParty,
  });

  String accountUrl;
  String email;
  String avatar;
  dynamic cover;
  bool publicImages;
  String albumPrivacy;
  bool proExpiration;
  bool acceptedGalleryTerms;
  List<dynamic> activeEmails;
  bool messagingEnabled;
  bool commentReplies;
  List<dynamic> blockedUsers;
  bool showMature;
  bool newsletterSubscribed;
  bool firstParty;

  factory Data.fromJson(Map<String, dynamic> json) => Data(
    accountUrl: json["account_url"],
    email: json["email"],
    avatar: json["avatar"],
    cover: json["cover"],
    publicImages: json["public_images"],
    albumPrivacy: json["album_privacy"],
    proExpiration: json["pro_expiration"],
    acceptedGalleryTerms: json["accepted_gallery_terms"],
    activeEmails: List<dynamic>.from(json["active_emails"].map((x) => x)),
    messagingEnabled: json["messaging_enabled"],
    commentReplies: json["comment_replies"],
    blockedUsers: List<dynamic>.from(json["blocked_users"].map((x) => x)),
    showMature: json["show_mature"],
    newsletterSubscribed: json["newsletter_subscribed"],
    firstParty: json["first_party"],
  );

  Map<String, dynamic> toJson() => {
    "account_url": accountUrl,
    "email": email,
    "avatar": avatar,
    "cover": cover,
    "public_images": publicImages,
    "album_privacy": albumPrivacy,
    "pro_expiration": proExpiration,
    "accepted_gallery_terms": acceptedGalleryTerms,
    "active_emails": List<dynamic>.from(activeEmails.map((x) => x)),
    "messaging_enabled": messagingEnabled,
    "comment_replies": commentReplies,
    "blocked_users": List<dynamic>.from(blockedUsers.map((x) => x)),
    "show_mature": showMature,
    "newsletter_subscribed": newsletterSubscribed,
    "first_party": firstParty,
  };
}
