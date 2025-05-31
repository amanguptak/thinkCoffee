import { ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useMyStore} from '../store/store';
import ItemImage from '../components/ItemImage';
import { COLORS } from '../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const [selectedPrice , setSelectedPrice] = useState(item.prices[item.prices.length-1].price)
  const addToFavorites = useMyStore((state) => state.addToFavorites);
const removeFromFavorites = useMyStore((state) => state.removeFromFavorites);

  const goBack = ()=>{
     navigation.goBack()
  }
const toggleFav = (fav:boolean,id:string)=>{
  fav ?  removeFromFavorites(id) : addToFavorites(id) }
  return (
    <SafeAreaView style={styles.screenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainDetailView}
      >
        <ItemImage
          enableBack={true}
          detailItem={item}
          backHandler={goBack}
          toggleFav={toggleFav}
        />
          <Description
            desc={item.description}
          />
          <SizeSelect
            prices={item.prices}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          
          />
          <CustomFooter
          price={selectedPrice}
          buttonTitle='Add to Cart'
          buttonPressHandler={()=>{}}
          
          />
        </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({

  screenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent:'space-between'
  },
  mainDetailView:{
     flexGrow: 1,
    justifyContent: 'space-between',
  }
});
