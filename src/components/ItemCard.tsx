import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ProductItem} from '../types/datatypes';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

interface ItemCardProps {
  item: ProductItem;
}
const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const ItemCard = ({item}: ItemCardProps) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={item.imagelink_square}
        style={styles.cardImg}
        resizeMode="cover">
        <View style={styles.cardRating}>
          <CustomIcon
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
        </View>
        <Text style={styles.ratingText}>{item.average_rating}</Text>
      </ImageBackground>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubTitle}>{item.special_ingredient}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPriceCurrency}>
          $ <Text style={styles.cardPrice}>{item.prices[0].price}</Text>
        </Text>

        <TouchableOpacity onPress={() => {}}>
          <BGIcon
            name={'add'}
            color={COLORS.primaryWhiteHex}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
     marginHorizontal:SPACING.space_20,
  },
  cardImg: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  cardRating: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  cardSubTitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  cardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  cardPrice: {color: COLORS.primaryWhiteHex},
});
