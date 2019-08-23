import RNFS from 'react-native-fs';

export const readFiles = () => {
  RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }
      return 'no file';
    }) 
    .then((contents) => {
    // log the file contents
      console.log({contents});
    })
    .catch((e) => {
      console.log(e.message, e.code);
    });
};

export const createFile = (x) => x;
