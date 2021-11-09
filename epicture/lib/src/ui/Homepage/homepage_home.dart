import 'package:epitech_project/src/models/Gallery.dart';
import 'package:epitech_project/src/models/GalleryList.dart';
import 'package:epitech_project/src/components/ImageViewer.dart';
import 'package:epitech_project/src/ui/components/container_publication.dart';
import 'package:flutter/material.dart';


// class Home extends StatefulWidget {
//
//   @override
//   _HomeState createState() => _HomeState();
// }
//
// class _HomeState extends State<Home> {
//
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return SingleChildScrollView(
//       child: Container(
//         width: size.width,
//         color: Colors.white,
//         alignment: Alignment.center,
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             ContainerPublication(title: "First publication",),
//             ContainerPublication(title: "Second publication",),
//             ContainerPublication(title: "Third publication",),
//           ],
//         ),
//       )
//     );
//   }
// }

class Home extends StatefulWidget {
  Home({
    Key key,
  }) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  GalleryList galleryList;

  final favoriteNotTriggered = Icon(
    Icons.favorite_border,
    color: Colors.blueAccent,
  );
  final favoriteTriggered = Icon(Icons.favorite, color: Colors.redAccent);

  _HomeState() {
    Gallery().getGallery({
      "section": "hot",
      "sort": "viral",
      "page": "1",
      "window": "day"
    }, {
      "showViral": true,
      "showMature": false,
      "albumPreviews": false
    }).then((GalleryList list) {
      setState(() {
        this.galleryList = list;
        // Sort files to keep only images
        this.galleryList.gallery.removeWhere((i) => ((i.imagesInfo != null &&
            i.imagesInfo.length != 0 &&
            i.imagesInfo[0].type.contains('mp4')) ||
            (i.cover == null)));
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (this.galleryList == null) {
      return CircularProgressIndicator();
    }
    return Container(
        child: ListView.builder(
          itemCount: this.galleryList.gallery.length,
          itemBuilder: (BuildContext context, int index) {
            return ImageViewer(image: this.galleryList.gallery[index], canPopContext: false, isFromUser: false);
          },
        ));
  }
}
