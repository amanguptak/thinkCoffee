import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartItem } from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from './CustomIcon';

interface CartItemsProps {
  cartItem: CartItem;
  decrementCartItem: (id: string, size: string) => void;
  incrementCartItem: (id: string, size: string) => void;
}

const CartItems = ({
  cartItem,
  decrementCartItem,
  incrementCartItem,
}: CartItemsProps) => {
  return (
    <View>
      {cartItem.prices.length > 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
          style={styles.multiSizeItem}>
          <View style={styles.itemRow}>
            <Image source={cartItem.imagelink_square} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <View>
                <Text style={styles.itemTitle}>{cartItem.name}</Text>
                <Text style={styles.itemSubtitle}>{cartItem.special_ingredient}</Text>
              </View>
              <View style={styles.roastBadge}>
                <Text style={styles.roastText}>{cartItem.roasted}</Text>
              </View>
            </View>
          </View>

          {cartItem.prices.map((p) => (
            <View key={p.size} style={styles.sizeRow}>
              <View style={styles.sizeInfo}>
                <View style={styles.sizeBox}>
                  <Text style={[
                    styles.sizeText,
                    {
                      fontSize:
                        cartItem.type === 'Bean'
                          ? FONTSIZE.size_12
                          : FONTSIZE.size_16,
                    },
                  ]}>
                    {p.size}
                  </Text>
                </View>
                <Text style={styles.priceText}>
                  ${' '}
                  <Text style={styles.priceValue}>
                    {parseFloat(p.price.toFixed(2))}
                  </Text>
                </Text>
              </View>

              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decrementCartItem(cartItem.id, p.size)}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.quantityBox}>
                  <Text style={styles.quantityText}>{p.quantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => incrementCartItem(cartItem.id, p.size)}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
          style={styles.singleSizeItem}>
          <Image
            source={cartItem.imagelink_square}
            style={styles.itemImage}
          />
          <View style={styles.singleInfo}>
            <View>
              <Text style={styles.itemTitle}>{cartItem.name}</Text>
              <Text style={styles.itemSubtitle}>{cartItem.special_ingredient}</Text>
            </View>
            <View style={styles.singleSizeRow}>
              <View style={styles.sizeBox}>
                <Text style={[
                  styles.sizeText,
                  {
                    fontSize:
                      cartItem.type === 'Bean'
                        ? FONTSIZE.size_12
                        : FONTSIZE.size_16,
                  },
                ]}>
                  {cartItem.prices[0].size}
                </Text>
              </View>
              <Text style={styles.priceText}>
                ${' '}
                <Text style={styles.priceValue}>
                  {parseFloat(cartItem.prices[0].price.toFixed(2))}
                </Text>
              </Text>
            </View>
            <View style={styles.singleQuantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decrementCartItem(cartItem.id, cartItem.prices[0].size)}>
                <CustomIcon
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View style={styles.singleQuantityBox}>
                <Text style={styles.quantityText}>
                  {cartItem.prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => incrementCartItem(cartItem.id, cartItem.prices[0].size)}>
                <CustomIcon
                  name="add"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItems;
const styles = StyleSheet.create({
  multiSizeItem: {
    flex: 1,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_16,
  },
  itemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    gap: SPACING.space_8,
  },
  itemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  itemSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  roastBadge: {
     height: 45,
    width: 70 * 2 + SPACING.space_20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  roastText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_12,
  },
  singleSizeRow:{
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_24,

  },
  sizeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_16,
  },
  sizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  priceValue: {
    color: COLORS.primaryWhiteHex,
  },
  quantityControl: {
  
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_12,
  },
  quantityBox: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_16,
    minWidth: 60,
    alignItems: 'center',
  },
  singleQuantityBox:{
backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_16,
    minWidth: 80,
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  quantityButton: {
    padding: SPACING.space_12,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
  },
  singleQuantityControl:{
     flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_18,
    

  },
  singleSizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_16,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_25,
  },
  singleInfo: {
    
    justifyContent: 'space-between',
    gap: 4,
  },
});
