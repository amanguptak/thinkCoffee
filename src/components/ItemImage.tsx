import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import CoffeeData from '../data/CoffeeData';
import GradientBgIcon from './GradientBgIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface ItemImageProps {
  enableBack: boolean;
  detailItem: (typeof CoffeeData)[number];
  backHandler?: () => void;
  toggleFav: (fav: boolean, id: string) => void;
  navigation: any;
}

const ItemImage = ({
  detailItem,
  enableBack,
  backHandler,
  toggleFav,
  navigation,
}: ItemImageProps) => {
  const productBack = () => {
    navigation.navigate('Details', {id: detailItem.id, type: detailItem.type});
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={detailItem.imagelink_portrait}
        style={styles.itemImage}>
        {enableBack ? (
          <View style={styles.headerWithBack}>
            <TouchableOpacity onPress={backHandler}>
              <GradientBgIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleFav(detailItem.favourite, detailItem.id);
              }}>
              <GradientBgIcon
                name="like"
                color={
                  detailItem.favourite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerWithoutBack}>
            <TouchableOpacity
              onPress={() => {
                toggleFav(detailItem.favourite, detailItem.id);
              }}>
              <GradientBgIcon
                name="like"
                color={
                  detailItem.favourite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.imgFooter}>
          <View style={styles.footerRow1}>
            <Pressable onPress={productBack}>
              <View>
                <Text style={styles.ItemTitleText}>{detailItem.name}</Text>
                <Text style={styles.ItemSubtitleText}>
                  {detailItem.special_ingredient}
                </Text>
              </View>
            </Pressable>
            <View style={styles.rightSide}>
              <View style={styles.properFirst}>
                <CustomIcon
                  name={detailItem.type == 'Bean' ? 'bean' : 'beans'}
                  size={
                    detailItem.type == 'Bean'
                      ? FONTSIZE.size_18
                      : FONTSIZE.size_24
                  }
                  color={COLORS.primaryOrangeHex}
                />
                <Text
                  style={[
                    styles.propertyTextFirst,
                    {
                      marginTop:
                        detailItem.type == 'Bean'
                          ? SPACING.space_4 + SPACING.space_2
                          : 0,
                    },
                  ]}>
                  {detailItem.type}
                </Text>
              </View>
              <View style={styles.properFirst}>
                <CustomIcon
                  name={detailItem.type == 'Bean' ? 'location' : 'drop'}
                  size={FONTSIZE.size_16}
                  color={COLORS.primaryOrangeHex}
                />
                <Text style={styles.propertyTextLast}>
                  {detailItem.ingredients}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.footerRow2}>
              <View style={styles.RatingContainer}>
                <CustomIcon
                  name={'star'}
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_20}
                />
                <Text style={styles.RatingText}>
                  {detailItem.average_rating}
                </Text>
                <Text style={styles.RatingCountText}>
                  ({detailItem.ratings_count})
                </Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{detailItem.roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ItemImage;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden', // ✅ required to clip children
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  headerWithBack: {
    padding: SPACING.space_30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  headerWithoutBack: {
    padding: SPACING.space_30,
    display: 'flex',

    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  imgFooter: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_24,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    gap: 10,
  },
  ItemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  ItemSubtitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  footerRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  properFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  propertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  propertyTextLast: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_2 + SPACING.space_4,
  },
  footerRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  RatingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  RatingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  RatingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  RoastedContainer: {
    height: 45,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
});
