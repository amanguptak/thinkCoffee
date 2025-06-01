import {
  ScrollView,
  StatusBar,
  StyleSheet,


} from 'react-native';
import Toast from 'react-native-toast-message';

import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useMyStore} from '../store/store';
import ItemImage from '../components/ItemImage';
import {COLORS} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Description from '../components/Description';
import SizeSelect from '../components/SizeSelect';
import CustomFooter from '../components/CustomFooter';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({navigation, route}: Props) => {
  const item = useMyStore(state =>
    route.params.type === 'Coffee'
      ? state.CoffeeMap[route.params.id]
      : state.BeanMap[route.params.id],
  );

  const defaultSelect = {
    size: item.prices[item.prices.length - 1].size,
    price: item.prices[item.prices.length - 1].price,
  };

  const [selectedItem, setSelectedItem] = useState(defaultSelect);
  const addToFavorites = useMyStore(state => state.addToFavorites);
  const removeFromFavorites = useMyStore(state => state.removeFromFavorites);
  const addToCart = useMyStore(state => state.addToCart);

  const addToCartAction = () => {
    addToCart({
      id: item.id,
      name: item.name,
      prices: [
        {
          size: selectedItem.size,
          price: Number(selectedItem.price),
          quantity: 1,
        },
      ],
    });
Toast.show({
  type: 'success', // now uses your custom component
  text1: 'Added to Cart',
  text2: `${item.name} (${selectedItem.size}) added successfully! ☕️`,
  position: 'bottom',
});
    // navigation.navigate('Cart') this is not correct way
    // navigation.navigate('Tab', {screen: 'Cart'});
  };

  const goBack = () => {
    navigation.goBack();
  };
  const toggleFav = (fav: boolean, id: string) => {
    fav ? removeFromFavorites(id) : addToFavorites(id);
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainDetailView}>
        <ItemImage
          enableBack={true}
          detailItem={item}
          backHandler={goBack}
          toggleFav={toggleFav}
        />
        <Description desc={item.description} />
        <SizeSelect
          prices={item.prices}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <CustomFooter
          price={selectedItem.price}
          buttonTitle="Add to Cart"
          buttonPressHandler={addToCartAction}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'space-between',
  },
  mainDetailView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
