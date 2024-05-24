import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirebaseApp } from './firebaseHelper';

const signUpAnonymously = async (navigation: any) => {
  try {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    // Navigate to the ChatScreen
    navigation.navigate('ChatScreen', { chatId: 'new' });
  } catch (error) {
    console.error('Error signing up anonymously:', error);
  }
};

export { signUpAnonymously };
