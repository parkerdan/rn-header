'use strict'

import React, { Component, PropTypes } from 'react';
import {
StyleSheet,
Text,
View,
TouchableOpacity,
Dimensions,
Animated
} from 'react-native';

import {once} from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';

const { height,width } = Dimensions.get('window');

const propTypes = {
backgroundColor: React.PropTypes.string.isRequired,
height: React.PropTypes.number.isRequired,
text: React.PropTypes.string,
leftText: React.PropTypes.string,
leftTextStyle:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),
rightText: React.PropTypes.string,
rightTextStyle:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),
rightText: React.PropTypes.string,
iconLeftName: React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),
onLeftIconPress: React.PropTypes.func,
iconRightName: React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),
onRightIconPress: React.PropTypes.func,
thirdIconName: React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.string]),
onThirdIconPress: React.PropTypes.func,
textStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),
iconSize: React.PropTypes.number,
iconColor: React.PropTypes.string,

scrollY: React.PropTypes.object,
};

export default class Header extends Component {

constructor(props){
super(props);
this.setHeight = once(this.setHeight.bind(this));
this.scrollListener = this.scrollListener.bind(this);
this.state = {
  scrollVal:0
};
};

componentWillMount(){
if (this.props.scrollY) {
  this.props.scrollY.addListener(this.scrollListener)
}
};

componentWillUnmount(){
if (this.props.scrollY) {
  this.props.scrollY.removeAllListeners();
}
};

scrollListener(e){
this.setState({scrollVal:e.value})
};

setHeight(height){
this.setHeight({
  initialHeight: height,
})
};

renderLeftIconOrText(){
 if (this.props.iconLeftName) {
   return(
     <Icon
       name={this.props.iconLeftName}
       size={this.props.iconSize}
       color={this.props.iconColor}/>
   )
 } else {
   return(
     <Text style={this.props.leftTextStyle}>{this.props.leftText}</Text>
   )
 }
};

renderLeftIcon(){
if (this.props.iconLeftName || this.props.leftText) {
 return(
   <TouchableOpacity
     hitSlop={{top:10,bottom:10,left:10,right:10}}
     onPress={this.props.onLeftIconPress}
     style={{
       flex:1,
       alignItems: 'center',
       justifyContent: 'flex-end',
     }}>
     {this.renderLeftIconOrText()}
   </TouchableOpacity>
 )
} else {
 return(
   <View style={{
     flex:1,
     alignItems: 'center',
     justifyContent: 'flex-end',
   }}/>
 )
}
};

renderThirdIcon(){
if (this.props.thirdIconName) {
 return(
   <TouchableOpacity
     hitSlop={{top:10,bottom:10,left:10,right:10}}
     onPress={this.props.onThirdIconPress}
     style={{
       flex:1,
       alignItems: 'center',
       justifyContent: 'flex-end',
     }}>
     <Icon
       name={this.props.thirdIconName}
       size={this.props.iconSize}
       color={this.props.iconColor}/>
   </TouchableOpacity>
 )
}
};

renderRightIcon(){
if (this.props.thirdIconName && this.props.iconRightName) {
 return(
   <View
     style={{
       flexDirection:'row',
       flex:1,
       alignItems: 'flex-end',
     }}>
     <TouchableOpacity
       style={{flex:1}}
       hitSlop={{top:10,bottom:10,left:10,right:10}}
       onPress={this.props.onThirdIconPress}>
       <Icon
         name={this.props.thirdIconName}
         size={this.props.iconSize}
         color={this.props.iconColor}/>
     </TouchableOpacity>
     <TouchableOpacity
       style={{flex:1}}
       onPress={this.props.onRightIconPress}>
       <Icon
         name={this.props.iconRightName}
         size={this.props.iconSize}
         color={this.props.iconColor}/>
     </TouchableOpacity>
   </View>
 )
} else if (this.props.iconRightName || this.props.rightText) {
 return(
   <TouchableOpacity
     onPress={this.props.onRightIconPress}
     style={{
       flex:1,
       alignItems: 'center',
       justifyContent: 'flex-end',
     }}>
     {this.renderRightIconOrText()}
   </TouchableOpacity>
 )
} else {
 return(
   <View style={{
     flex:1,
     alignItems: 'center',
     justifyContent: 'flex-end',
   }}/>
 )
}
};

renderRightIconOrText(){
 if (this.props.iconRightName) {
   return(
     <Icon
       name={this.props.iconRightName}
       size={this.props.iconSize}
       color={this.props.iconColor}/>
   )
 } else {
   return(
     <Text style={this.props.rightTextStyle}>{this.props.rightText}</Text>
   )
 }
};

renderHeight(){
if (this.props.scrollY) {
 return(
   this.props.scrollY.interpolate({
     inputRange: [-100,0,200,200],
     outputRange: [this.props.height,this.props.height, 0, 0],
     extrapolate:'clamp'
   })
 )
} else return this.props.height
};

renderHeader(){
if (this.state.scrollVal < 200) {
 return(
   <Animated.View
     style={{
       backgroundColor: this.props.backgroundColor,
       flexDirection: 'row',
       width: width,
       paddingBottom: 4,
       height: this.renderHeight(),
     }}>
     { this.renderLeftIcon() }
     <View
       style={{
         flex:3,
         alignItems: 'center',
         justifyContent: 'flex-end',
       }}>
       <Text
         style={this.props.textStyle}
         numberOfLines={1}>
         {this.props.text}
       </Text>
     </View>
     { this.renderRightIcon() }
   </Animated.View>
 )
}
};

renderTotalHeight(){
if (this.props.scrollY) {
 return(
   this.props.scrollY.interpolate({
     inputRange: [-100,0,200,200],
     outputRange: [this.state.initialHeight,this.state.initialHeight, (this.state.initialHeight - this.props.height), (this.state.initialHeight - this.props.height)],
     extrapolate:'clamp'
   })
 )
}
};


render(){

return(
 <Animated.View
   onLayout={
     (e) => this.setHeight(e.nativeEvent.layout.height)
   }

   style={{
     height: this.renderTotalHeight()
   }}>
   {this.renderHeader()}
   {this.props.children}
 </Animated.View>
)
};
};

Header.propTypes = propTypes;
