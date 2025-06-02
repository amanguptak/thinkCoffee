import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}:Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
       <HeaderBar title='Payment' enableBack={true} backHandler={goBack} />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({

  container:{
    backgroundColor:COLORS.primaryBlackHex,
    flex:1,
    paddingVertical: SPACING.space_20
  }

})