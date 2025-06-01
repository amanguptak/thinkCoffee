/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Price} from '../types/datatypes';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
//  prices: [
//       {size: 'S', price: '1.38', currency: '$'},
//       {size: 'M', price: '3.15', currency: '$'},
//       {size: 'L', price: '4.29', currency: '$'},
//     ]

interface SizeSelectProps {
  prices: Price[];
  // Update function signature
  setSelectedItem: (payload: {size: string; price: string}) => void;

  selectedItem: {size: string; price: string};
}

const SizeSelect = ({
  prices,
  setSelectedItem,
  selectedItem,
}: SizeSelectProps) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.infoText}>Size</Text>
      <View style={styles.container}>
        {prices.map(p => (
          <TouchableOpacity
            key={p.size}
            onPress={() => {
              setSelectedItem({size: p.size, price: p.price});
            }}
            style={[
              styles.selectBtn,
              {
                borderColor:
                  p.price === selectedItem.price
                    ? COLORS.primaryOrangeHex
                    : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.sizeText,
                {
                  color:
                    p.size === selectedItem.size
                      ? COLORS.primaryOrangeHex
                      : COLORS.secondaryLightGreyHex,
                },
              ]}>
              {p.size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SizeSelect;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: SPACING.space_20,
  },
  infoText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  selectBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 15,
  },
});
