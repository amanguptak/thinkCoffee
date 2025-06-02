import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useMyStore} from '../store/store';
import HeaderBar from '../components/HeaderBar';
import {COLORS, SPACING} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps, useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import EmptyList from '../components/EmptyList';
import CustomFooter from '../components/CustomFooter';
import Toast from 'react-native-toast-message';
import CartItems from '../components/CartItems';
import { RootStackParamList, RootTabParamList } from '../types/navigation';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList,'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;


const CartScreen = ({navigation}:Props) => {
  const cartList = useMyStore(state => state.CartList);
  const cartPrice = useMyStore(state => state.CartPrice);
  const clearCart = useMyStore(state => state.clearCart);
  const getTotals = useMyStore(state => state.getTotals);
  const decreaseCart = useMyStore(state => state.decreaseCart);
  const incrementCartItem = useMyStore(state => state.increaseCart);
  const tabBarHeight = useBottomTabBarHeight();
  console.log(cartList, 'cartlist');

  const removeCart = () => {
    clearCart();
    Toast.show({
      type: 'success', // now uses your custom component
      text1: 'Cart is Cleared successfully! ☕️',

      position: 'bottom',
    });
  };

  const goDetails = (id:string , itemType:string)=>{
    // {navigation.push('Details',{id:item.id , type: item.type})}
    navigation.navigate('Details' , {id:id , type:itemType})
  }

  useEffect(() => {
    getTotals();
  }, [cartList, getTotals]);

  const goPayment = ()=>{
      navigation.navigate('Payment',{price:cartPrice})
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.contentWrapper}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent]}>
          <View
            style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
            <HeaderBar title="cart" />
            {cartList.length === 0 ? (
              <EmptyList title="Cart is Empty" />
            ) : (
              <View style={styles.listItemsContainer}>
                {cartList.map(cartItem => (
                  <CartItems
                    key={cartItem.id}
                    cartItem={cartItem}
                    incrementCartItem={incrementCartItem}
                    decrementCartItem={decreaseCart}
                    goDetails={goDetails}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {cartList.length !== 0 && (
          <View style={{marginBottom: tabBarHeight}}>
            <CustomFooter
              buttonTitle="Pay"
              price={cartPrice}
              buttonPressHandler={goPayment}
              removeCart={removeCart}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingBottom: SPACING.space_20,
  },

  scrollViewInnerView: {
    paddingBottom: SPACING.space_20,
  },

  itemCard: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  listItemsContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
