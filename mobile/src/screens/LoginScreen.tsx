import { StyleSheet, View } from 'react-native';
import React from 'react';

import { AuthForm } from '../components/AuthForm';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <AuthForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
