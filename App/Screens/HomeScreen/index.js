import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

export default class HomeScreen extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}
