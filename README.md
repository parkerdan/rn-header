# RN-Header
<a href="https://npmjs.org/package/rn-header"><img alt="npm version" src="http://img.shields.io/npm/dt/rn-header.svg?style=flat-square"></a>
### Can Use the header as a stand alone header, or a scroll away header.

##### You must have `react-native-vector-icons` installed and linked for this to display icons on the header.  Can also display text on the sides of header


### Uses Font Awesome icons as the icon source
```js
npm install react-native-vector-icons --save
react-native link react-native-vector-icons
npm install rn-header --save

```
- To use as a scroll away header takes a little work to set up.
- import `Animated` from react-native
- Add an Animated.Value to the constructor.  Need a `scrollY` so the Header can respond properly
- Can use with Listview or ScrollView.
- SET UP THE ONSCROLL PROP TO MATCH THIS EXAMPLE
- If you don't `use scrollEventThrottle` you're gonna have a bad time...mmmm-kay??
- just copy/paste this example and you'll get the hang of it 🤓
- When using as a scroll away header, wrap whatever content you want to stay within the `<Header>  </Header>` tags.  When using as a stand alone Header, just use as `<Header/>`


####  If you do not want the header to scroll away,  do not supply the header with the `scrollY`



![gif](./scrollaway.gif "scroll away")

```js
'use strict'

import React, { Component } from 'react';
import {
View,
Text,
ScrollView,
Animated
} from 'react-native';

import Header from 'rn-header';


export default class Example extends Component {
 constructor(){
   super();
   this.scrollY = new Animated.Value(0)
 };


 render(){
   let things = ['Watch','The','Header','Scroll','Away','As','I','Move'].map((opt,i) => {
     return(
       <View
         key={i}
         style={{
           marginTop:60,
           backgroundColor:'deeppink',
           paddingLeft:20
         }}>
         <Text style={{fontSize:33}}>{opt}</Text>
       </View>
     )
   });
   return(
     <View style={{
       flex:1,
       backgroundColor:'yellow'
     }}>
       <Header
         scrollY={this.scrollY}
         backgroundColor={'blue'}
         height={60}
         centerText={'Scroll Away'}
         rightIconProps={{
           name:'cogs',
           size:25,
           color:'white'
         }}
         onRightPress={
           () => console.log('Stuff')
          }
         centerTextProps={{
           fontSize:20,
           color:'white',
           fontWeight:'500'
         }}>

         <View style={{
           height:200,
           backgroundColor:'red',
           alignItems:'center',
           justifyContent:'center'
         }}>
           <Text style={{
             color:'white',
             fontSize:23,
             textAlign: 'center'
           }}>Watch me stay after the header goes away!</Text>
         </View>
       </Header>

       <ScrollView
         scrollEventThrottle={16}
         onScroll={
           // this maps the onScroll event to the scrollY variable declared in the constructor.  Now the header has a reference to the scrolling and can respond properly
           Animated.event(
           [{nativeEvent: {contentOffset: {y:  this.scrollY }}}]
           )
         }

         {things}
       </ScrollView>
     </View>
   )
 };

};
```

### All props
| Prop  |  Type  | Description       | Required |
| ---   | ---    | ---               | --- |
| backgroundColor | string           | backgroundColor of the Header                     | **YES** |
| height          | number           | height of the Header                              | **YES** |
| centerText | string | Text to display in the center | no|
| centerTextProps | Text Props | any valid Text props | no |
| onCenterPress | function | what to do on center press....like scroll to top or show a pop-up | no |
| onRightPress | function | what to do on right press | no |
| onLeftPress | function | what to do on right press | no |
| leftTextProps | Text Props | any valid Text Props | no |
| leftIconProps | Icon Props | any valid Icon Props | no |
| rightTextProps | Text Props | any valid Text Props | no |
| rightIconProps | Icon Props | any valid Icon props | no |
