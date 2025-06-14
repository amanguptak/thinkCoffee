import { View,  StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcon from './CustomIcon'
import { COLORS, SPACING } from '../theme/theme'

interface GradientBGIconProps {
  name: string;
  color: string;
  size: number;
}

const GradientBgIcon = ({name,color,size}:GradientBGIconProps) => {
  return (
    <View style ={styles.container}>
       
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientBG}>
         <CustomIcon name={name} color={color} size={size} />
      </LinearGradient>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
       borderWidth:2,
          borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLORS.secondaryDarkGreyHex,
    overflow:'hidden',

    },
     LinearGradientBG: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
export default GradientBgIcon