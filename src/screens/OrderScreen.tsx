import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useMyStore} from '../store/store';
import {COLORS} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../components/HeaderBar';
import OrderHistory from '../components/OrderHistory';
import EmptyList from '../components/EmptyList';
import { BottomTabScreenProps, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../types/navigation';
import { CompositeScreenProps } from '@react-navigation/native';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Orders'>,
  NativeStackScreenProps<RootStackParamList>
>;

const OrderScreen = ({navigation}:Props) => {
  const tabBarheight = useBottomTabBarHeight()
  const orderHistory = useMyStore(s => s.OrderHistoryList);
  console.log(orderHistory, 'addOrderHistory');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginBottom:tabBarheight}}>
        <HeaderBar title="Order History" />
        {orderHistory.length === 0 ? (
          <EmptyList title="No Past Order Yet" />
        ) : (
          <View style={styles.multipleOrder}>
{ orderHistory.map(order => (
            <OrderHistory order={order} key={order.id} navigation={navigation} />
          ))}
          </View>
         
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  multipleOrder:{
    gap:12,
  }
});
