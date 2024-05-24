import React from 'react';
import { LogBox } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthScreen } from 'screens/AuthScreen';
import ChatScreen from 'screens/ChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

const Stack = createNativeStackNavigator();

enableScreens(true);

export default function App() {
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AuthScreen'>
        <Stack.Screen name='AuthScreen' component={AuthScreen} />
        <Stack.Screen  name='ChatScreen' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
