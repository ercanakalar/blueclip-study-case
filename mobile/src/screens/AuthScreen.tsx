import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUpAnonymously } from '../utils/signUp';

const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <Button
      title='Sign Up Anonymously'
      onPress={() => signUpAnonymously(navigation)}
    />
  );
};

export { AuthScreen };
