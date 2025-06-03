import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useMyStore} from '../store/store';
import {COLORS} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../components/HeaderBar';
import OrderHistory from '../components/OrderHistory';
import EmptyList from '../components/EmptyList';

const OrderScreen = () => {
  const orderHistory = useMyStore(s => s.OrderHistoryList);
  console.log(orderHistory, 'addOrderHistory');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderBar title="Order History" />
        {orderHistory.length === 0 ? (
          <EmptyList title="No Past Order Yet" />
        ) : (
          orderHistory.map(order => (
            <OrderHistory order={order} key={order.id} />
          ))
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
});
