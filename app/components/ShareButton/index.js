import React from 'react';
import { string } from 'prop-types';
import { Button, Share } from 'react-native';
import { createFile, deleteFile } from '../../helpers/fileManager';

const ShareButton = ({ fileName, itemToShare }) => {
  const onShare = async ({ filePath }) => {
    try {
      const result = await Share.share({
        subject: fileName,
        url: `file://${filePath}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
          console.log('successfully shared', result);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed');
      }
      // now delete the local file
      deleteFile({ filePath });
    } catch (e) {
      console.log('error', e.message);
    }
  };

  const createNewFile = () => {
    createFile({ content: itemToShare, fileName }).then((filePath) => onShare({ filePath }));
  };

  return <Button onPress={createNewFile} title="Share GPX" />;
};

ShareButton.propTypes = {
  fileName: string.isRequired,
  itemToShare: string.isRequired,
};

export default ShareButton;
