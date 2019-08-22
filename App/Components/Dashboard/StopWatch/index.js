import React, { useEffect, useState } from 'react';
import { bool } from 'prop-types';
import { Text, View } from 'react-native';
import { addSeconds, format } from 'date-fns';

import { stdTimezoneOffsetInSecs } from '../../../helpers/timeManager';

const StopWatch = ({ isStarted }) => {
  const [isActive, setIsActive] = useState(false);
  const [ms, setMs] = useState(0);

  const reset = () => {
    setMs(0);
    setIsActive(false);
  };

  useEffect(() => {
    setIsActive(isStarted);
    let intervalId = null;
    if (isActive) {
      const startTime = (Date.now() - ms);
      intervalId = setInterval(() => {
        setMs(Date.now() - startTime);
      }, 1000);
    } else if (!isActive && ms) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isActive, isStarted, ms]);

  return (
    <View>
      <Text>
        { format(
          addSeconds(
            new Date(0),
            ms * 0.001 + stdTimezoneOffsetInSecs(),
          ),
          'HH:mm:ss',
        )}
      </Text>
    </View>
  );
};

StopWatch.propTypes = {
  isStarted: bool,
};

StopWatch.defaultProps = {
  isStarted: false,
};

export default StopWatch;
