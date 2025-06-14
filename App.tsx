import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigator/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
import {RootStackParamList} from './src/types/navigation';
import Toast from 'react-native-toast-message';
import CustomSuccessToast from './src/components/CustomToast';


const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom', headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{animation: 'slide_from_bottom',headerShown: false,}}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{animation: 'slide_from_bottom' , headerShown: false}}
        />
      </Stack.Navigator>
      <Toast
  config={{
    success: (props) => <CustomSuccessToast {...props} />,
  }}
/>
    </NavigationContainer>
  );
};

export default App;
