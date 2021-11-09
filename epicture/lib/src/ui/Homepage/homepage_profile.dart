import 'package:epitech_project/src/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:epitech_project/src/models/AccountBase.dart';
import 'package:epitech_project/src/models/Account.dart';
import 'package:epitech_project/src/models/GalleryList.dart';
import 'package:epitech_project/src/models/GalleryImage.dart';
import 'package:epitech_project/src/components/ImageViewer.dart';

class Profile extends StatefulWidget {
  Profile({Key key}) : super(key: key);

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> with SingleTickerProviderStateMixin {
  AccountBase accountBase;
  GalleryList accountImages;
  GalleryList accountFavoritesImages;
  int pubCount;
  TabController tabController;

  _ProfileState() {
    Account().getAccountImages().then((GalleryList g) => (setState(() => this.accountImages = g)));
    Account().getAccountBase().then((AccountBase a) => (setState(() => this.accountBase = a)));
    Account().getAccountPublicationsCount().then((int c) => (setState(() => this.pubCount = c)));
    Account().getGalleryFavorites().then((GalleryList g) => (setState(() => this.accountFavoritesImages = g)));
  }

  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    if (this.accountBase == null || this.accountImages == null
        || this.pubCount == null || this.accountFavoritesImages == null) {
      return CircularProgressIndicator();
    } else {
      return Container(
        child: Column(
          children: <Widget>[
            createProfileHeader(context),
            createTabBar(context),
            createProfileAlbum(context)
          ],
        ),
      );
    }
  }

  Widget createTabBar(BuildContext context) {
    return Container(
      child: TabBar(
        controller: this.tabController,
        tabs: <Widget>[
          Tab(
            icon: Icon(
                Icons.person,
                color: kPrimaryColor
            ),
          ),
          Tab(
              icon: Icon(
                  Icons.favorite,
                  color: kPrimaryColor
              )
          )
        ],
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

  Widget createProfileAlbum(BuildContext context) {
    return Expanded(
      child: TabBarView(
        controller: this.tabController,
        children: <Widget>[
          Container(
            child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3),
                itemCount: this.accountImages.gallery.length,
                scrollDirection: Axis.vertical,
                shrinkWrap: true,
                itemBuilder: (BuildContext context, int index) {
                  return createResultCard(context, this.accountImages.gallery[index]);
                }
            ),
          ),
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
          )
        ],
      ),
    );
  }

  Widget createProfileHeader(BuildContext context) {
    return Container(
        child: Card(
            child: Container(
                padding: EdgeInsets.all(10),
                child: Column(
                  children: <Widget>[
                    Container(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            createProfilePicture(context),
                            createProfileStatisticsComments(context),
                            createProfileStatisticsGrades(context)
                          ],
                        )
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 10),
                      child: Text(
                        (this.accountBase.bio == null) ? "Aucune biographie" : this.accountBase.bio,
                        style: TextStyle(fontStyle: FontStyle.italic, fontSize: 12),
                      ),
                    )
                  ],
                )
            )
        )
    );
  }

  Widget createProfilePicture(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          Container(
            child: Align(
              alignment: Alignment.centerLeft,
              child: Container(
                width: 60.0,
                height: 60.0,
                decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    image: DecorationImage(
                        fit: BoxFit.cover,
                        image: NetworkImage("https://imgur.com/user/" + this.accountBase.name + "/avatar")
                    )
                ),
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.only(
                top: 5),
            child: Text(
              this.accountBase.name,
              style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 15),
            ),
          )
        ],
      ),
    );
  }

  Widget createProfileStatisticsComments(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          Container(
            child: Icon(
              Icons.camera,
              color: kPrimaryColor,
              size: 30,
            ),
          ),
          Container(
            child: Text(
              this.pubCount.toString(),
              style: TextStyle(fontWeight: FontWeight.w600),
            ),
          )
        ],
      ),
    );
  }

  Widget createProfileStatisticsGrades(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
          right: MediaQuery.of(context).size.width / 10),
      child: Column(
        children: <Widget>[
          Container(
            child: Icon(
              Icons.grade,
              color: kPrimaryColor,
              size: 30,
            ),
          ),
          Container(
            child: Text(
              this.accountBase.reputation.toString(),
              style: TextStyle(fontWeight: FontWeight.w600),
            ),
          )
        ],
      ),
    );
  }
}
