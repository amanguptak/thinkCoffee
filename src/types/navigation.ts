// src/types/navigation.ts (same file)
import {NavigatorScreenParams} from '@react-navigation/native';
export type RootStackParamList = {
  Tab: NavigatorScreenParams<RootTabParamList>; // ✅ correct
  // It tells TypeScript that Tab is a navigator containing screens like Cart, so you can navigate to them using navigation.navigate('Tab', { screen: 'Cart' }).

  // Tab: NavigatorScreenParams<RootTabParamList> means that the Tab screen is actually a navigator (not just a screen), and you can navigate to its inner screens like 'Cart' using nested params.
  Details: {id: string; type: string};
  Payment: undefined;
};

// src/types/navigation.ts
export type RootTabParamList = {
  Home: undefined;
  Cart: undefined;
  Favorite: undefined;
  Orders: undefined;
};
