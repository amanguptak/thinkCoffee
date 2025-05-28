import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMyStore} from '../store/store';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import {CategoryList, CategoryState, ProductItem} from '../types/datatypes';
import CategoryFilter from '../components/CategoryFilter';


export const getCategoriesFromData = (data: ProductItem[]): CategoryList => {
  if (!data.length) return [];

  const categoryCount = data.reduce((final: Record<string, number>, curr) => {
    final[curr.name] === undefined
      ? (final[curr.name] = 1)
      : (final[curr.name] += 1);
    return final;
  }, {});

  const categories = Object.keys(categoryCount);
  categories.unshift('All');
  return categories;
};

export const getCoffeeList = (
  category: string,
  data: ProductItem[],
): ProductItem[] => {
  if (category === 'All') return data;
  return data.filter(item => item.name === category);
};

const HomeScreen = () => {
  const coffeeList = useMyStore((state: any) => state.CoffeeList);
  const beanList = useMyStore((state: any) => state.BeanList);
  console.log(coffeeList, 'and', beanList);

  const [categories, setCategories] = useState<CategoryList>([]);
   useEffect(()=>{
  setCategories(getCategoriesFromData(coffeeList))
  },[coffeeList])

  const [categoryIndex, setCategoryIndex] = useState<CategoryState>({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState<ProductItem[]>(
    getCoffeeList(categoryIndex.category, coffeeList),
  );

    console.log('sortedCoffee',sortedCoffee)
  const [searchText, setSearchText] = useState('');
 
  // const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView
      style={styles.ScreenContainer}
      edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar title="home" />

        <Text style={styles.ScreenHeading}>
          Find the best{`\n`}Coffee for you
        </Text>

        <View style={styles.SearchContainer}>
          <TouchableOpacity onPress={() => {}}>
            <CustomIcon
              style={styles.SearchIcon}
              name="search"
              size={FONTSIZE.size_20}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Find Your Coffee"
            onChangeText={text => {
              setSearchText(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.SearchInput}
          />
        </View>
        <CategoryFilter
          categories={categories}
          setCategoryIndex={setCategoryIndex}
          categoryIndex={categoryIndex}
          setSortedCoffee={setSortedCoffee}
          coffeeList={coffeeList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenHeading: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    padding: SPACING.space_32,
  },
  SearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.space_28,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    marginTop: -10,
  },
  SearchIcon: {
    marginHorizontal: SPACING.space_20,
  },
  SearchInput: {
    flex: 1,
    color: COLORS.primaryWhiteHex,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
});
