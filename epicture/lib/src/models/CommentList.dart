import 'package:epitech_project/src/models/Comment.dart';
import 'package:json_annotation/json_annotation.dart';

part 'CommentList.g.dart';

@JsonSerializable()
class CommentList {
  @JsonKey(name: "data")
  List<Comment> list;


  CommentList(this.list);

  factory CommentList.fromJson(Map<String, dynamic> json) => _$CommentListFromJson(json);

  Map<String, dynamic> toJson() => _$CommentListToJson(this);
}