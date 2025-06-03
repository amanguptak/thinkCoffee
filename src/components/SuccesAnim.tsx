import LottieView from 'lottie-react-native';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';

interface SuccessProps {
    style:any,
    source:any
}

const Success = ({style,source}: SuccessProps) => {
  return (
    <View style={styles.container}>
        <LottieView
            style={style}
            source={source}
            autoPlay={false}
        />
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: 'center',
  }
});
