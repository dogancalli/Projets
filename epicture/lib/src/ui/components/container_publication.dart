import 'package:flutter/material.dart';
import 'package:epitech_project/src/constants/constants.dart';

class ContainerPublication extends StatelessWidget {

  final String title;
  final image;
  final commentary;

  const ContainerPublication({
    Key key,
    this.title,
    this.commentary,
    this.image
  }) : super(key : key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Container(
      width: size.width,
      decoration: BoxDecoration(border: Border.symmetric(horizontal: BorderSide(color: Colors.black12, width: 1))),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.symmetric(vertical: 15.0, horizontal: 20.0),
            color: Colors.white,
            child: Row(
              children: [
                Text(title, style: TextStyle(color: textColor, fontSize: titleSize),),
              ],
            ),
          ),
          Container(
            width: size.width,
            height: size.height*0.3,
            child: Image.network("https://fakeimg.pl/350x200/?text=World&font=lobster", height: size.height*0.5,),
          ),
          Container(
            width: size.width,
            padding: EdgeInsets.symmetric(vertical: 15.0, horizontal: 20.0),
            color: Colors.white,
            child: Row(
              children: [
                Icon(Icons.favorite, color: Colors.black12,),
                new Spacer(),
                Icon(Icons.messenger_rounded, color: Colors.black12,),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(vertical: 15.0, horizontal: 20.0),
            color: Colors.white70,
            child: Column(
              children: [
                Row(
                  children: [
                    Text("eaeaeaeae", style: TextStyle(color: Colors.black54, fontSize: textSize),),
                  ],
                ),
                SizedBox(height: 10,),
                Row(
                  children: [
                    Text("eaeaeaeae", style: TextStyle(color: Colors.black54, fontSize: textSize),),
                  ],
                ),
                SizedBox(height: 10,),
                Row(
                  children: [
                    Text("eaeaeaeae", style: TextStyle(color: Colors.black54, fontSize: textSize),),
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}