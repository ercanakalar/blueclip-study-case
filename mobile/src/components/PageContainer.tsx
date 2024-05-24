import React from 'react';
import { StyleSheet, View } from 'react-native';

const PageContainer = (props: {style?: any, children: React.ReactNode}) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PageContainer;
