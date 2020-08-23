import React, { useState } from 'react';
import { Picker, Text, View } from 'react-native';

import s from '../../styles';

const SettingsScreen = () => {
  const [trackWidth, setTrackWidth] = useState(10);
  return (
    <View>
      <Text>Settings Screen</Text>
      <View style={{ flexDirection: 'row', backgroundColor: 'pink' }}>
        <Text>Track Width</Text>
        <Picker selectedValue={10} style={{ height: 50, width: 100 }} onValueChange={(value) => setTrackWidth(value)}>
          <Picker.Item label="5px" value="5" />
          <Picker.Item label="10px" value="10" />
        </Picker>
      </View>
    </View>
  );
};

export default SettingsScreen;
