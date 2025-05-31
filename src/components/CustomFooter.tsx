
import { Text, View, StyleSheet } from 'react-native';

interface CustomFooterProps {}

const CustomFooter = (props: CustomFooterProps) => {
  return (
    <View style={styles.container}>
      <Text>CustomFooter</Text>
    </View>
  );
};

export default CustomFooter;

const styles = StyleSheet.create({
  container: {}
});
