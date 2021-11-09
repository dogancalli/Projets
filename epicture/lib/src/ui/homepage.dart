// TODO Implement this library.
import 'package:epitech_project/src/ui/Homepage/homepage_favorites.dart';
import 'package:epitech_project/src/ui/Homepage/homepage_home.dart';
import 'package:epitech_project/src/ui/Homepage/homepage_profile.dart';
import 'package:epitech_project/src/ui/Homepage/homepage_search.dart';
import 'package:flutter/material.dart';
import '../constants/constants.dart';
import 'Homepage/homepage_add.dart';

class Homepage extends StatefulWidget {

  @override
  _HomepageState createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {

  int currentIndex = 0;
  String currentLabel;
  List _labelOptions = [
    'Accueil',
    'Rechercher',
    'Image',
    'Profil',
    'Favoris'
  ];
  List <Widget> _widgetOptions = <Widget>[
    Home(),
    Search(),
    Add(),
    Profile(),
    MyFavorites()
  ];

  void onItemTap(int index){
    setState(() {
      currentIndex = index;
      currentLabel = _labelOptions[index];
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("DOREMY", textAlign: TextAlign.left, style: TextStyle(color: kPrimaryColor, fontWeight: FontWeight.bold),),
        centerTitle: false,
        backgroundColor: Colors.white,
      ),
      body: _widgetOptions.elementAt(currentIndex),
      bottomNavigationBar: BottomNavigationBar(
        showSelectedLabels: true,
        showUnselectedLabels: false,
        fixedColor: kPrimaryColor,
        currentIndex: currentIndex,
        backgroundColor: Colors.white,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home, color: kPrimaryColor,),
            label: 'Accueil',
            backgroundColor: Colors.white
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search, color: kPrimaryColor,),
            label: 'Rechercher',
            backgroundColor: Colors.white
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.add_a_photo, color: kPrimaryColor,),
              label: 'Image',
              backgroundColor: Colors.white
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle, color: kPrimaryColor,),
            label: 'Profil',
            backgroundColor: Colors.white
          ),
         BottomNavigationBarItem(
            icon: Icon(Icons.favorite, color: kPrimaryColor,),
            label: 'Favoris',
           backgroundColor: Colors.white
         ),
        ],
        onTap: onItemTap,
      ),
    );
  }
}



