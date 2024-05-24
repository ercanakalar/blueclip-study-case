import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../constants/colors';

import { useRef } from 'react';

const createId = () => {
  return (Math.random() * 1000000).toFixed(0);
};

const Bubble = (props: any) => {
  const { text, type } = props;

  const bubbleStyle: any = { ...styles.container };
  const textStyle: any = { ...styles.text };
  const wrapperStyle: any = { ...styles.wrapperStyle };

  const menuRef: any = useRef();
  const id = useRef(createId());

  let Container: any = View;

  switch (type) {
    case 'system':
      textStyle.color = '#65644A';
      bubbleStyle.backgroundColor = colors.grey;
      bubbleStyle.alignItems = 'center';
      bubbleStyle.marginTop = 10;
      break;
    case 'error':
      textStyle.color = colors.nearlyWhite;
      bubbleStyle.backgroundColor = colors.red;
      bubbleStyle.marginTop = 10;
      break;
    case 'myMessage':
      wrapperStyle.justifyContent = 'flex-end';
      bubbleStyle.backgroundColor = '#E7FED6';
      bubbleStyle.maxWidth = '90%';
      Container = TouchableWithoutFeedback;
      break;
    case 'theirMessage':
      wrapperStyle.justifyContent = 'flex-start';
      bubbleStyle.maxWidth = '90%';
      Container = TouchableWithoutFeedback;
      break;

    default:
      break;
  }

  return (
    <View style={wrapperStyle}>
      <Container
        onLongPress={(): any =>
          console.log(
            menuRef.current.props.ctx.menuActions.openMenu(id.current)
          )
        }
        style={{ width: '100%' }}
      >
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
    borderColor: '#E2DACC',
    borderWidth: 1,
  },
  text: {
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
});

export default Bubble;
