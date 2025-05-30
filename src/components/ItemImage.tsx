import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CoffeeData from '../data/CoffeeData';
import GradientBgIcon from './GradientBgIcon';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

interface ItemImageProps {
  enableBack: boolean;
  detailItem: (typeof CoffeeData)[number];
  backHandler: () => void;
  toggleFav: (fav :boolean ,id:string) => void;
}

const ItemImage = ({
  detailItem,
  enableBack,
  backHandler,
  toggleFav,
}: ItemImageProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={detailItem.imagelink_portrait}
        style={styles.itemImage}
      >
      {enableBack ? (
        <View style={styles.headerWithBack}>
          <TouchableOpacity onPress={backHandler}>
            <GradientBgIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {toggleFav(detailItem.favourite,detailItem.id)}}>
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
          <TouchableOpacity onPress={() => {}}>
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
       </ImageBackground>
    </View>
  );
};

export default ItemImage;

const styles = StyleSheet.create({
  container: {},
  itemImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  headerWithBack:{
    padding: SPACING.space_30,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'

  },
   headerWithoutBack:{
    padding: SPACING.space_30,
    display:'flex',
   
    alignItems:'center',
    justifyContent:'flex-end'
   },
    // itemImage:{},
});
