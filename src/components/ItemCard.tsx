import {Text, View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {ProductItem} from '../types/datatypes';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTSIZE} from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

interface ItemCardProps {
  item: ProductItem;
}

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
      <Text>{item.name}</Text>
      <Text>{item.special_ingredient}</Text>
      <View style={styles.cardFooter}>
        <Text>
          $ <Text style={styles.cardPrice}>{item.prices[0].price}</Text>
        </Text>

        <TouchableOpacity onPress= {()=>{}}>
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
  container: {},
   cardImg: {},
    cardRating: {},
     ratingText: {},
      cardFooter: {},
      cardPrice:{},
});
