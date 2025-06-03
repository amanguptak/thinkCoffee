import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useMyStore} from '../store/store';
import Success from '../components/SuccesAnim';
import CreditCard from '../components/CreditCard';
import PaymentOptions from '../components/PaymentOptions';
import CustomFooter from '../components/CustomFooter';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const paymentOption = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation}: Props) => {
  const cartPrice = useMyStore(state => state.CartPrice);
  const cartQuantity = useMyStore(state => state.CartQuantity);
const addOrderToHistory = useMyStore((s) => s.addOrderToHistory);
  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showSuccess, setShowSuccess] = useState(false);

  const payNow = () => {
    setShowSuccess(true);
    addOrderToHistory()

    setTimeout(() => {
      navigation.navigate('Tab', {screen: 'Orders'});
    }, 4000);
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {showSuccess && (
        <Success
          style={styles.lotteAnimation}
          source={require('../lottie/successful.json')}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <HeaderBar title="Payment" enableBack={true} backHandler={goBack} />
        <View style={styles.paymentBox}>
          <CreditCard
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
          />

          <View style={styles.payOption}>
            {paymentOption.map(pay => (
              <TouchableOpacity
                key={pay.name}
                onPress={() => setPaymentMode(pay.name)}>
                <PaymentOptions paymentMode={paymentMode} payOption={pay} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.quantityText}>
            Items Quantity : <Text style={styles.quantity}>{cartQuantity}</Text>
          </Text>
        </View>
      </ScrollView>

      <CustomFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={cartPrice}
        buttonPressHandler={payNow}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
    paddingVertical: SPACING.space_20,
  },
  lotteAnimation: {
    flex: 1,
    

  },

  scrollContainer: {
    flexGrow: 1,
  },
  paymentBox: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  payOption:{
    gap:10
  },
  quantityText: {
    padding: SPACING.space_4,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryGreyHex,
  },

  quantity: {
    color: COLORS.primaryOrangeHex,
  },
});

