import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import s from '../../styles';

export default class SettingsScreen extends PureComponent {
  render() {
    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}
