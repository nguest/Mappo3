import React from 'react';
import { object } from 'prop-types';
import { View, Text } from 'react-native';

import s from '../../styles';

const SingleTrackScreen = ({
  navigation,
}) => {
  const id = navigation.getParam('id', null);
  return (
    <View style={[s.align.vCenter, s.align.hCenter]}>
      <Text>Single Track Screen</Text>
      <Text>{ id }</Text>

    </View>
  );
};

SingleTrackScreen.propTypes = {
  navigation: object.isRequired,
};

export default SingleTrackScreen;
