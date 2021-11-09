import 'package:epitech_project/src/constants/constants.dart';
import 'package:epitech_project/src/models/Gallery.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:epitech_project/src/models/Imgur.dart' as imgur;

class Add extends StatefulWidget {

  @override
  _AddState createState() => _AddState();
}

class _AddState extends State<Add> {


  File _image;


  _imgFromCamera() async {
    File image = await ImagePicker.pickImage(
        source: ImageSource.camera, imageQuality: 100
    );

    setState(() {
      _image = image;
    });
  }

  _imgFromGallery() async {
    File image = await  ImagePicker.pickImage(
        source: ImageSource.gallery, imageQuality: 100
    );

    setState(() {
      _image = image;
    });
  }

  void _showPicker(context) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bc) {
          return SafeArea(
            child: Container(
              child: new Wrap(
                children: <Widget>[
                  new ListTile(
                      leading: new Icon(Icons.photo_library),
                      title: new Text('Galerie'),
                      onTap: () {
                        _imgFromGallery();
                        Navigator.of(context).pop();
                      }),
                  new ListTile(
                    leading: new Icon(Icons.photo_camera),
                    title: new Text('Camera'),
                    onTap: () {
                      _imgFromCamera();
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              ),
            ),
          );
        }
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: kPrimaryLightColor,),
      body: Column(
        children: <Widget>[
          SizedBox(
            height: 90,

          ),
          Center(
            child: GestureDetector(
              onTap: () {
                _showPicker(context);
              },
              child: CircleAvatar(
                radius: 55,
                backgroundColor: kPrimaryLightColor,
                child: _image != null
                    ? ClipRRect(
                  borderRadius: BorderRadius.circular(50),
                  child: Image.file(
                    _image,
                    width: 100,
                    height: 100,
                    fit: BoxFit.fitHeight,
                  ),
                )
                    : Container(
                  decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(50)),
                  width: 100,
                  height: 100,
                  child: Icon(
                    Icons.camera_alt,
                    color: kPrimaryColor,
                  ),
                ),
              ),
            ),
          ),
        SizedBox(height: 20,),
          Center(
              child: GestureDetector(
                onTap: () {
                  Gallery().sendPicture(_image);
                },
                child: CircleAvatar(
                  radius: 55,
                  backgroundColor: kPrimaryLightColor,
                  child: Icon(
                    Icons.send,
                    color: kPrimaryColor,
                  ),
                ),
              )
          ),
        ],
      ),
    );
  }

}