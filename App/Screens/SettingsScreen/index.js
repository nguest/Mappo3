import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

export default class SettingsScreen extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

