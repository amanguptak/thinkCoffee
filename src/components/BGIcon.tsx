import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';
import { BORDERRADIUS, SPACING } from '../theme/theme';

interface BGIconProps {
    name:string,
    color:string,
    size:number,
    BGColor:string,
}

const BGIcon = ({name,color,size,BGColor}: BGIconProps) => {
  return (
    <View style={[styles.container,{backgroundColor:BGColor}]}>
     <CustomIcon name={name} color={color} size={size}/>
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  container: {
    height:SPACING.space_30,
    width:SPACING.space_30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDERRADIUS.radius_8
  }
});
