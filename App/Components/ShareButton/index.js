import React, { Component } from 'react';
import { Button, Share } from 'react-native';

export default class ShareButton extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        //message: 'React Native | A framework for building native apps using React',
        url: "file://",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed')
      }
    } catch (e) {
      console.log('error', e.message)
    }
  };

  render() {
    return <Button onPress={this.onShare} title="Share" />;
  }
};
