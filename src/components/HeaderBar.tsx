import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBgIcon from './GradientBgIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title?: string;
  enableBack?:boolean,
  backHandler?:()=>void,
}

const HeaderBar = ({title ,enableBack=false , backHandler}: HeaderBarProps) => {
  return (
    <View style={styles.HeaderContainer}>
     {!enableBack ? <GradientBgIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />  :  <TouchableOpacity onPress={backHandler}>
              <GradientBgIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>} 
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
