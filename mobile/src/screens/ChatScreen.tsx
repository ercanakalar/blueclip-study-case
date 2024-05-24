import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import colors from '../constants/colors';
import PageContainer from 'components/PageContainer';
import Bubble from 'components/Bubble';

import { HOST } from '@env';
import { set } from 'firebase/database';

const ChatScreen = (props: any) => {
  const [messages, setMessages] = useState<
    { id: string; text: string; sender: 'user' | 'system' }[]
  >([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const flatListRef: any = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when chatMessages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  });

  const sendMessage = useCallback(async () => {
    if (!message.trim() || loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${HOST}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newMessage = { id: `${Date.now()}`, text: message, sender: 'user' };
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);

      const responseMessage = {
        id: `${Date.now() + 1}`,
        text: data.response,
        sender: 'system',
      };
      setMessages((prevMessages: any) => [...prevMessages, responseMessage]);
      setMessage('');
    } catch (error: any) {
      console.error('Error sending message:', error.message);
    } finally {
      setLoading(false);
    }
  }, [message, loading]);

  const renderMessageItem = ({
    item,
  }: {
    item: { id: string; text: string; sender: 'user' | 'system' };
  }) => {
    return (
      <Bubble
        text={item.text}
        type={item.sender === 'user' ? 'myMessage' : 'theirMessage'}
      />
    );
  };

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <PageContainer style={{ backgroundColor: 'transparent' }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
          />
        </PageContainer>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textbox}
            value={message}
            onChangeText={(text) => setMessage(text)}
            onSubmitEditing={sendMessage}
            onTouchEndCapture={() => {
              setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
              }, 100);
            }}
            editable={!loading}
          />

          <TouchableOpacity
            style={{ ...styles.mediaButton, ...styles.sendButton }}
            onPress={sendMessage}
            disabled={loading}
          >
            <Feather name='send' size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  screen: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightGrey,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 8,
  },
});

export default ChatScreen;
