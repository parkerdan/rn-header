'use strict'

import React from 'react';
import {
Text,
View,
TouchableOpacity,
Animated,
StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
 container:{flex:1,alignItems:'center',justifyContent:'flex-end'},
 bigContainer:{flex:3,alignItems:'center',justifyContent:'flex-end'}})
const propTypes = {
backgroundColor: React.PropTypes.string.isRequired,
height: React.PropTypes.number.isRequired,
};

export default class Header extends React.Component {

renderLeftIconOrText(){
if (this.props.leftIconProps) {
  return(
    <Icon {...this.props.leftIconProps}/>
  )
} else {
  return(
    <Text {...this.props.leftTextProps}>{this.props.leftText}</Text>
  )
}
};

renderLeftIcon(){
if (this.props.leftIconProps || this.props.leftText) {
return(
  <TouchableOpacity
    hitSlop={{top:10,bottom:10,left:10,right:10}}
    onPress={this.props.onLeftPress}
    style={styles.container}>
    {this.renderLeftIconOrText()}
  </TouchableOpacity>
)
} else {
return(
  <View style={styles.container}/>
)
}
};


renderRightIcon(){
if (this.props.rightIconProps || this.props.rightText) {
return(
  <TouchableOpacity
    hitSlop={{top:10,bottom:10,left:10,right:10}}
    onPress={this.props.onRightPress}
    style={styles.container}>
    {this.renderRightIconOrText()}
  </TouchableOpacity>
)
} else {
return(
  <View style={styles.container}/>
)
}
};

renderRightIconOrText(){
if (this.props.rightIconProps) {
  return(
    <Icon {...this.props.rightIconProps}/>
  )
} else {
  return(
    <Text {...this.props.rightTextProps}>{this.props.rightText}</Text>
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
return(
  <Animated.View
    style={{
      backgroundColor: this.props.backgroundColor,
      flexDirection: 'row',
      height: this.renderHeight(),
    }}>
    { this.renderLeftIcon() }
    <TouchableOpacity
      activeOpacity={1}
      onPress={this.props.onCenterPress}
      style={styles.bigContainer}>
      <Text {...this.props.centerTextProps}>
        {this.props.centerText}
      </Text>
    </TouchableOpacity>
    { this.renderRightIcon() }
  </Animated.View>
)
};


render(){
return(
<View>
  {this.renderHeader()}
  {this.props.children}
</View>
)
};
};

Header.propTypes = propTypes;
