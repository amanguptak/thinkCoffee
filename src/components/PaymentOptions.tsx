import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from './CustomIcon';

interface payType{
    name:string,
    icon: any,
    isIcon:boolean
}

interface PaymentOptionsProps {
    paymentMode:string,
    payOption:payType


}

const PaymentOptions = ({payOption,paymentMode}: PaymentOptionsProps) => {
  return (
    <View style={[styles.container , {
        borderColor : paymentMode === payOption.name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex,
    }]}>
       {payOption.isIcon ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientWallet}>
          <View style={styles.WalletRow}>
            <CustomIcon
              name={'wallet'}
              color={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_30}
            />
            <Text style={styles.PaymentTitle}>{payOption.name}</Text>
          </View>
          <Text style={styles.PaymentPrice}>$ 100.50</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradientRegular}>
          <Image source={payOption.icon} style={styles.PaymentImage} />
          <Text style={styles.PaymentTitle}>{payOption.name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  container: {
     borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryGreyHex,
    borderWidth: 3,
  }
  ,
   linearGradientWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_20,
  },
  WalletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_24,
  },
  LinearGradientRegular: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_20,
  },
  PaymentTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  PaymentPrice: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  PaymentImage: {
    height: SPACING.space_30,
    width: SPACING.space_30,
  },
});
