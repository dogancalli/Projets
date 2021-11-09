import 'package:epitech_project/src/components/ImageViewer.dart';
import 'package:epitech_project/src/models/GalleryList.dart';
import 'package:flutter/material.dart';
import 'package:epitech_project/src/models/AccountBase.dart';
import 'package:epitech_project/src/models/Account.dart';
import 'package:epitech_project/src/models/GalleryList.dart';
import 'package:epitech_project/src/models/GalleryImage.dart';

class MyFavorites extends StatefulWidget {

  @override
  _FavoritesState createState() => _FavoritesState();
}

class _FavoritesState extends State<MyFavorites> {

  GalleryList accountFavoritesImages;
  GalleryList accountImages;
  TabController tabController;

  _FavoritesState(){Account().getGalleryFavorites().then((GalleryList g) => (setState(() => this.accountFavoritesImages = g)));}

  @override
  Widget build(BuildContext context) {

      return Container(
        child: Column(
          children: <Widget>[
            createProfileAlbum(context)
          ],
        ),
      );

  }


  Widget createProfileAlbum(BuildContext context) {
    return
          Container(
            child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 4),
                itemCount: this.accountFavoritesImages.gallery.length,
                scrollDirection: Axis.vertical,
                shrinkWrap: true,
                itemBuilder: (BuildContext context, int index) {
                  return createResultCard(context, this.accountFavoritesImages.gallery[index]);
                }
            ),
          );
  }

  Widget createResultCard(BuildContext context, GalleryImage image) {
    return Container(
      child: Card(
          semanticContainer: true,
          child: InkWell(
            onTap: () {
              Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => ImageViewer(
                      image: image,
                      isFromUser: true,
                      canPopContext: true)
                  )
              );
            },
            child: GridTile(
              child: Container(
                decoration: BoxDecoration(
                    shape: BoxShape.rectangle,
                    image: DecorationImage(
                        fit: BoxFit.cover,
                        image: NetworkImage(
                          "https://i.imgur.com/" + image.id + "." +
                              ((image.imagesInfo == null) ? "jpg": image.imagesInfo[0].type.split('/')[1]),
                        )
                    )
                ),
              ),
            ),
          )
      ),
    );
  }
}