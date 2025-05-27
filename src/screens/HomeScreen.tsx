import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMyStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const getCategoriesFromData = (data: any) => {
  if (!data.length) return;

  const categoryCount = data.reduce(
    (final: Record<string, number>, curr: any) => {
      final[curr.name] === undefined
        ? (final[curr.name] = 1)
        : (final[curr.name] += 1);

      return final;
    },
    {},
  );

  const categories = Object.keys(categoryCount);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name == category);
    return coffeeList;
  }
};

const HomeScreen = () => {
  const coffeeList = useMyStore((state: any) => state.CoffeeList);
  const beanList = useMyStore((state: any) => state.BeanList);
  console.log(coffeeList, 'and', beanList);

  const [categories, setCategories] = useState<T['']>(
    getCategoriesFromData(coffeeList),
  );
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffe, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, coffeeList),
  );
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text>Welcome to Home Screen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
