# RN-Header

### Can Use the header as a stand alone header, or a scroll away header.

#### You must have `react-native-vector-icons` installed and linked for this to work


### Uses Font Awesome icons as the icon source
```js
npm install react-native-vector-icons --save
react-native link react-native-vector-icons
npm install rn-header --save

```


- To use as a scroll away header takes a little work to set up.
-  Import `Animated` from react-native
- Add two values to the component state.  Need a `scrollY` and the `scrollVal` so the Header can respond properly

- Also need a listener on the animated value

- Can use with Listview as well, the set up is Identical.

- just copy/paste this example and you'll get the hang of it 🤓

####  If you do not want the header to scroll away,  do not supply the header with the `scrollY` and `scrollVal`



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
 constructor(props){
   super(props);
   this.scrollListener = this.scrollListener.bind(this);
   this.state = {
     scrollY: new Animated.Value(0),
     scrollVal: 0,
   };
 };

 componentWillMount(){
   this.state.scrollY.addListener(this.scrollListener);
 };

 componentWillUnmount(){
   this.state.scrollY.removeAllListeners();
 };

 scrollListener(e){
   this.setState({scrollVal:e.value})
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
         scrollVal={this.state.scrollVal}
         scrollY={this.state.scrollY}
         backgroundColor={'blue'}
         height={60}
         text={'Scroll Away'}
         iconRightName={'cogs'}
         iconSize={25}
         iconColor={'white'}
         onRightIconPress={ this.addItem }
         textStyle={{
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
           Animated.event(
           [{nativeEvent: {contentOffset: {y:  this.state.scrollY }}}]
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
```js
backgroundColor: React.PropTypes.string.isRequired,
height: React.PropTypes.number.isRequired,
text: React.PropTypes.string,

iconLeftName: React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),
onLeftIconPress: React.PropTypes.func,

iconRightName: React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),
onRightIconPress: React.PropTypes.func,

thirdIconName: React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),
onThirdIconPress: React.PropTypes.func,

textStyle: React.PropTypes.object,

iconSize: React.PropTypes.number,
iconColor: React.PropTypes.string,

scrollY: React.PropTypes.object,
scrollVal: React.PropTypes.number

```
![Two Icons](./TwoIcons.png "Two Icons")
![Three Icons](./ThreeIcons.png "Three Icons")
