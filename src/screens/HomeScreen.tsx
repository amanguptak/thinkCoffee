import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMyStore} from '../store/store';
import {BottomTabScreenProps, useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

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
import ItemCard from '../components/ItemCard';
import NotFound from '../components/NotFound';
import { RootStackParamList, RootTabParamList } from '../types/navigation';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;
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

const HomeScreen = ({navigation}:Props) => {
  const listRef = useRef<FlatList>(null);

  const coffeeList = useMyStore((state: any) => state.CoffeeList);
  const beanList = useMyStore((state: any) => state.BeanList);
  console.log(coffeeList, 'and', beanList);
const [categories, setCategories] = useState<CategoryList>([]);
const [categoryIndex, setCategoryIndex] = useState<CategoryState>({
  index: 0,
  category: 'All',          // safe default
});
const [sortedCoffee, setSortedCoffee] = useState<ProductItem[]>([]); // start empty
const [searchText, setSearchText] = useState('');

useEffect(() => {
  const cats = getCategoriesFromData(coffeeList);
  setCategories(cats);

  // always reset to "All" when source list changes
  setCategoryIndex({ index: 0, category: cats[0] ?? 'All' });
  setSortedCoffee(coffeeList);
}, [coffeeList]);

  const searchCoffee = (text: string) => {
   if (text.trim() === '') {
    setSortedCoffee(getCoffeeList(categoryIndex.category, coffeeList));
    return;
  }
  listRef.current?.scrollToOffset({ offset: 0, animated: true });
  setSortedCoffee(
    coffeeList.filter((c:any) =>
      c.name.toLowerCase().includes(text.toLowerCase()),
    ),
  );
  };

  const resetSearchCoffe = ()=>{
   listRef.current?.scrollToOffset({ offset: 0, animated: true });
  setSearchText('');
  setSortedCoffee(getCoffeeList(categoryIndex.category, coffeeList));
  }
  // useEffect(() => {
  //   setCategories(getCategoriesFromData(coffeeList));
  // }, [coffeeList,sortedCoffee]);


  const tabBarHeight = useBottomTabBarHeight();
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
          <TouchableOpacity onPress={() => {
             
            }}>
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
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(text)
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.SearchInput}
          />

          {
            searchText.length >0 ?(
              <TouchableOpacity
                onPress={resetSearchCoffe}
              >
                <CustomIcon
                  style={styles.closeIcon}
                  name='close'
                  size={FONTSIZE.size_16}
                  color={COLORS.primaryGreyHex}
                />
              </TouchableOpacity>
            ):(<></>)
          }
        </View>
        <CategoryFilter
          categories={categories}
          setCategoryIndex={setCategoryIndex}
          categoryIndex={categoryIndex}
          setSortedCoffee={setSortedCoffee}
          coffeeList={coffeeList}
          listRef={listRef}
        />

        <View style={styles.itemContainer}>
          <FlatList
            ref={listRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            ListEmptyComponent={<NotFound/>}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => {navigation.push('Details',{id:'123'})}}>
                <ItemCard item={item} />
              </TouchableOpacity>
            )}
          />
          <Text style={styles.itemSubHeading}>Coffee Beans</Text>
          <FlatList
            ref={listRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={beanList}
            contentContainerStyle={[{marginBottom: tabBarHeight}]}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => {}}>
                <ItemCard item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
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
  closeIcon:{
    paddingHorizontal:SPACING.space_10,
  },
  itemContainer: {
    marginBottom: 2,
  },
  itemSubHeading: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginHorizontal: SPACING.space_4,
    padding: SPACING.space_20,
    fontSize: FONTSIZE.size_16,
  },
});
