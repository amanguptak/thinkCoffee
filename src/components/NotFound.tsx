import * as React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {SPACING} from '../theme/theme';

// interface NotFoundProps {}

const NotFound = () => {
  console.log(
    "Dimensions.get('window').width - SPACING.space_30",
    Dimensions.get('window').width - SPACING.space_30,
  );
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageNotFound}
        source={require('../assets/coffee_assets/coffenotfound.png')}
      />
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36,
  },
  imageNotFound: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // optional for aspect ratio control
  },
});
