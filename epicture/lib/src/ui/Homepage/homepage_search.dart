import 'package:epitech_project/src/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:epitech_project/src/models/Gallery.dart';
import 'package:epitech_project/src/models/GalleryList.dart';
import 'package:epitech_project/src/models/GalleryImage.dart';
import 'package:epitech_project/src/components/ImageViewer.dart';

class Search extends StatefulWidget {
  Search({Key key}) : super(key: key);

  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  GalleryList galleryList;
  TextEditingController textInputController;
  int currentSortingOption = 0;
  int currentWindowOption = 0;
  List<String> sortOptions = ["time", "viral", "top"];
  List<String> windowOptions = ["all", "day", "week", "month", "year"];
  String currentSearch = "Cat";

  _SearchState() {
    SharedPreferences.getInstance().then((SharedPreferences prefs) {
      Gallery().getGalleryResearch(this.currentSearch,
          this.sortOptions[this.currentSortingOption],
          this.windowOptions[this.currentWindowOption]).then((GalleryList list) {
        setState(() {
          this.galleryList = list;
        });
      });
    });
  }

  @override
  void dispose() {
    textInputController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    this.textInputController = TextEditingController();
    super.initState();
  }

  void updateSortingOptions(int index) {
    this.currentSortingOption = index;
    Gallery().getGalleryResearch(this.currentSearch,
        this.sortOptions[this.currentSortingOption],
        this.windowOptions[this.currentWindowOption]).then((GalleryList list) {
      setState(() {
        this.galleryList = list;
      });
    });
  }

  void updateWindowOptions(int index) {
    this.currentWindowOption = index;
    Gallery().getGalleryResearch(this.currentSearch,
        this.sortOptions[this.currentSortingOption],
        this.windowOptions[this.currentWindowOption]).then((GalleryList list) {
      setState(() {
        this.galleryList = list;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (galleryList == null) {
      return CircularProgressIndicator();
    }
    return Container(
      child: Column(
        children: <Widget>[
          createSearchBar(context),
          createCardGrid(context)
        ],
      ),
    );
  }

  Widget createSearchBar(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          Container(
            alignment: Alignment.topCenter,
            child: TextField(
                onSubmitted: (String search) {
                  this.currentSearch = search;
                  Gallery().getGalleryResearch(this.currentSearch,
                      this.sortOptions[this.currentSortingOption],
                      this.windowOptions[this.currentWindowOption]).then((GalleryList list) {
                    setState(() {
                      this.galleryList = list;
                    });
                  });
                },
                controller: this.textInputController,
                decoration: InputDecoration(
                    border: InputBorder.none,
                    prefixIcon: new Icon(Icons.search, color: kPrimaryLightColor),
                    hintText: "Rechercher...",
                    hintStyle: new TextStyle(color: kPrimaryLightColor)
                )
            ),
          ),
          Container(
            padding: EdgeInsets.all(5),
            child: Column(
              children: <Widget>[
                Container(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentSortingOption == 0) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Date"),
                          onPressed: () => this.updateSortingOptions(0),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentSortingOption == 1) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Viral"),
                          onPressed: () => this.updateSortingOptions(1),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentSortingOption == 2) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Top"),
                          onPressed: () => this.updateSortingOptions(2),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  child: Row(
                    children: <Widget>[
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentWindowOption == 0) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Tout"),
                          onPressed: () => this.updateWindowOptions(0),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentWindowOption == 1) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Jour"),
                          onPressed: () => this.updateWindowOptions(1),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentWindowOption == 2) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Semaine"),
                          onPressed: () => this.updateWindowOptions(2),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentWindowOption == 3) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Mois"),
                          onPressed: () => this.updateWindowOptions(3),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.only(right: 5),
                        child: InputChip(
                          selected: (this.currentWindowOption == 4) ? true : false,
                          selectedColor: kPrimaryLightColor,
                          label: Text("Année"),
                          onPressed: () => this.updateWindowOptions(4),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),);
  }

  Widget createCardGrid(BuildContext context) {
    // Sort files to keep only images
    this.galleryList.gallery.removeWhere((i) => (
        (i.imagesInfo != null && i.imagesInfo.length != 0 && i.imagesInfo[0].type.contains('mp4'))
            || (i.cover == null)
    ));

    return Flexible(
        child: GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3),
            itemCount: this.galleryList.gallery.length,
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemBuilder: (BuildContext context, int index) {
              return createResultCardImage(
                  context, this.galleryList.gallery[index]);
            }
        )
    );
  }

  Widget createResultCardImage(BuildContext context, GalleryImage image) {
    return Container(
      child: Card(
          elevation: 5,
          semanticContainer: true,
          child: InkWell(
            onTap: () {
              Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => ImageViewer(image: image, canPopContext: true, isFromUser: false))
              );
            },
            child: GridTile(
              child: Container(
                decoration: BoxDecoration(
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(10),
                    image: DecorationImage(
                        fit: BoxFit.cover,
                        image: NetworkImage(
                            "https://i.imgur.com/" + image.cover + "." +
                                image.imagesInfo[0].type.split('/')[1]
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