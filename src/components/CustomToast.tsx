import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomSuccessToast = ({ text1, text2 }: any) => {
  return (
    <View style={styles.toastContainer}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </View>
  );
};

export default CustomSuccessToast;

const styles = StyleSheet.create({
  toastContainer: {
    borderWidth: 2,
    borderColor: '#FFA500',
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ff9800',
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
});
