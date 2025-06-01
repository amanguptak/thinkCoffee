import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';


// interface PriceProp{
//      price: string;
//   currency: string;
// }

interface CustomFooterProps {
  price: number;
  buttonPressHandler: () => void;
  buttonTitle: string;
  removeCart?: () => void;
}

const CustomFooter = ({
  price,
  buttonPressHandler,
  buttonTitle,
  removeCart,
}: CustomFooterProps) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
          $ <Text style={styles.Price}>{parseFloat(Number(price).toFixed(2))}</Text>
        </Text>
      </View>
      {removeCart && (
        <TouchableOpacity onPress={removeCart}>
          <View style={styles.clearCart}>
             <CustomIcon
           name='close'
           size={20}
           color={COLORS.primaryOrangeHex}
          />
          {/* <Text> clear</Text> */}
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.PayButton}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFooter;

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_10,
  },
  PriceContainer: {
    alignItems: 'center',
    width: 100,
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  Price: {
    color: COLORS.primaryWhiteHex,
  },
  PayButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  clearCart:{
    alignItems:"center",
   
  }
});
