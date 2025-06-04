import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
// import CoffeeData from '../data/CoffeeData';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import OrderCard from './OrderCard';
import {ProductItem} from '../types/datatypes';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../types/navigation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Orders'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface orderHistoryI {
  date: string;
  id: string;
  items: any;
  quantity: number;
  total: number;
}

interface OrderHeaderProps {
  order: orderHistoryI;
  navigation: Props['navigation'];
}

function formatOrderDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


const OrderHistory = ({order,navigation}: OrderHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.orderMain}>
        <View>
          <Text style={styles.orderDateText}>Order Date</Text>
          <Text style={styles.orderDateTextValue}> {formatOrderDate(order.date)}</Text>
        </View>

        <View style={styles.orderAmount}>
          <Text style={styles.orderAmountText}>Total Amount</Text>
          <Text style={styles.orderAmountPrice}>$ {order.total}</Text>
        </View>
      </View>
      {order.items.map((p: ProductItem) => (
        <OrderCard orderItem={p} key={p.id} total={order.total} navigation={navigation}/>
      ))}
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.space_20,
    flex: 1,
    paddingHorizontal: SPACING.space_30,
  },
  orderMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDateText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  orderDateTextValue: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  orderAmount: {
    alignItems: 'flex-end',
  },
  orderAmountText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  orderAmountPrice: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
  },
});
