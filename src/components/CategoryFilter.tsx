import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getCoffeeList} from '../screens/HomeScreen';
import {COLORS, FONTFAMILY, SPACING} from '../theme/theme';

import {CategoryState, ProductItem} from '../types/datatypes';

interface CategoryFilterProps {
  categories: string[];
  setCategoryIndex: (value: CategoryState) => void;
  categoryIndex: CategoryState;
  setSortedCoffee: (list: ProductItem[]) => void;
  coffeeList: ProductItem[];
}

const CategoryFilter = ({
  categories,
  setCategoryIndex,
  categoryIndex,
  setSortedCoffee,
  coffeeList,
}: CategoryFilterProps) => {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categories.map((cat, index) => (
        <View key={cat} style={styles.categoryScroll}>
          <TouchableOpacity
            style={styles.categoryScrollItem}
            onPress={() => {
              setCategoryIndex({index: index, category: categories[index]});
              setSortedCoffee([
                ...getCoffeeList(categories[index], coffeeList),
              ]);
            }}>
            <Text
              style={[
                styles.categoryText,
                categoryIndex.index === index && {
                  color: COLORS.primaryOrangeHex,
                  borderBottomColor: COLORS.primaryOrangeHex, // Make underline visible
                },
              ]}>
              {cat}
            </Text>

            {/* {categoryIndex.index === index ? (
              <View style={styles.activeCategory} />
            ) : (
              <></>
            )} */}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_8,
    marginBottom: SPACING.space_10,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollItem: {
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
    paddingBottom: SPACING.space_4, // Add some spacing
    borderBottomWidth: 2, // Add underline
    borderBottomColor: 'transparent', // Default: invisible
  },

  // activeCategory: {
  //   height: 2,
  //   width: '100%',
  //   backgroundColor: COLORS.primaryOrangeHex,
  //   marginTop: 4,
  //   borderRadius: 1,
  // },
});
