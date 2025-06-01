import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useMyStore} from '../store/store';
import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import EmptyList from '../components/EmptyList';
// update path if needed

const CartScreen = () => {
  const cartList = useMyStore(state => state.CartList);
  const cartPrice = useMyStore(state => state.CartPrice);
  const clearCart = useMyStore(state=> state.clearCart)
  const tabBarHeight = useBottomTabBarHeight();
  console.log(cartList, 'cartlist');

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {marginBottom: tabBarHeight},
        ]}>
        <HeaderBar title="cart" />
        {cartList.length === 0 ? <EmptyList title="Cart is Empty" /> : <View>
          
          </View>}

        <View>
          <TouchableOpacity onPress={clearCart}>

            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* 
      <FlatList
        data={cartList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            {item.prices.map((p) => (
              <Text key={p.size}>
                Size: {p.size} | Price: ${p.price} | Qty: {p.quantity}
              </Text>
            ))}
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
});
