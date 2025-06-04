import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useMyStore} from '../store/store';
import EmptyList from '../components/EmptyList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import ItemImage from '../components/ItemImage';
import Description from '../components/Description';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabScreenProps, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList, RootTabParamList } from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Favorite'>,
  NativeStackScreenProps<RootStackParamList>
>;

const FavoritesScreen = ({navigation}:Props) => {
  const favList = useMyStore(state => state.FavoritesList);
  const addToFavorites = useMyStore(state => state.addToFavorites);
  const removeFromFavorites = useMyStore(state => state.removeFromFavorites);
  const toggleFav = (fav: boolean, id: string) => {
    fav ? removeFromFavorites(id) : addToFavorites(id);

    console.log('clicked');
  };
const tabBarBottom = useBottomTabBarHeight()
  console.log(favList, 'favlist');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mainDetailView}>
        <HeaderBar title="Favorites" />
        {favList.length === 0 ? (
          <EmptyList title="Favorites is Empty" />
        ) : (
          <View style={[styles.favListing , {marginBottom:tabBarBottom}]}>
            {favList.map(fav => (
              <LinearGradient
                key={fav.id}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
                style={styles.favItem}>
                <ItemImage
                  enableBack={false}
                  detailItem={fav}
                  toggleFav={toggleFav}
                  navigation={navigation}
                />
                <Description desc={fav.description} />
              </LinearGradient>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'space-between',
  },
  mainDetailView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  favListing: {
    padding: SPACING.space_15,
    gap: SPACING.space_20,
  },
  favItem: {
    borderRadius: 30,
    backgroundColor: 'red',
  },
});
