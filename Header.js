'use strict'

import React, { Component, PropTypes } from 'react';
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const { height,width } = Dimensions.get('window');

const propTypes = {
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
 iconColor: React.PropTypes.string
};

export default class Header extends Component {

 renderLeftIcon(){
   if (this.props.iconLeftName) {
     return(
       <TouchableOpacity
         hitSlop={{top:10,bottom:10,left:10,right:10}}
         onPress={this.props.onLeftIconPress}
         style={{
           flex:1,
           alignItems: 'center',
           justifyContent: 'flex-end',
         }}>
         <Icon
           name={this.props.iconLeftName}
           size={this.props.iconSize}
           color={this.props.iconColor}/>
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
   } else if (this.props.iconRightName) {
     return(
       <TouchableOpacity
         onPress={this.props.onRightIconPress}
         style={{
           flex:1,
           alignItems: 'center',
           justifyContent: 'flex-end',
         }}>
         <Icon
           name={this.props.iconRightName}
           size={this.props.iconSize}
           color={this.props.iconColor}/>
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

 render(){
   return(
     <View
       style={{
         backgroundColor: this.props.backgroundColor,
         height: this.props.height,
         flexDirection: 'row',
         width: width,
         paddingBottom: 4,
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
     </View>
   )
 };
};

Header.propTypes = propTypes;
