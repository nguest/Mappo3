import RNFS from 'react-native-fs';
import { format } from 'date-fns';

export const readFiles = () => {
  RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is undefined)
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
      console.log({ contents });
    })
    .catch((e) => {
      console.log(e.message, e.code);
    });
};

export const createFile = ({ content, fileName }) => {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
  const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  // write the file
  return RNFS.writeFile(path, content, 'utf8')
    .then(() => {
      console.log('FILE WRITTEN!');
      return path;
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export const deleteFile = ({ filePath }) => (
  RNFS.unlink(filePath)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    })
);

export const convertTrackToGPX = ({ track }) => {
  const headers = `
  <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="Oregon 400t" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">`;

  const metadata = `<metadata>
      <link href="http://guestandguest.com">
        <text>Mappo 3</text>
      </link>
      <time>${track.data[0].ts}</time>
    </metadata>`;

  const points = track.data.reduce((str, p) => {
    const x = `<trkpt lat="${p.lat}" lon="${p.lon}">
        <ele>${p.alt}</ele>
        <time>${format(p.ts, 'YYYY-MM-DDTHH:MM:SSZ')}</time>
      </trkpt>`;
    return str.concat('', x);
  }, '');

  const trackGPX = `
    ${headers}
    ${metadata}
    <trk>
      <name>Track on ${format(track.date, 'DD/MM/YYYY')}</name>
      <trkseg>
        ${points}
      </trkseg>
    </trk>
  </gpx>`;

  return trackGPX;
};

export const DDtoDDSStr = (DD, bytes) => {
  const afterPoint = (DD - Math.floor(DD)) * 60;
  const strAfterPoint = `${afterPoint.toFixed(5)}`.replace('.', '');
  return `${Math.floor(DD)}${strAfterPoint}`.padStart(bytes, '0');
};

export const convertTrackToIGC = ({ track }) => {
  const headers = `AXGD Garmin USB: eTrex Vista HCx Software Version 3.30
  HFDTE010813
  HOPLTPILOT: Nicholas Guest
  HOGTYGLIDERTYPE: Ozone Rush 3 
  HOGIDGLIDERID: 
  HODTM100GPSDATUM: WGS-84
  HOCIDCOMPETITIONID: 
  HOCCLCOMPETITION CLASS: 
  HOSITSite:`;

  const fixes = track.data.reduce((str, p) => {
    const time = `${format(p.ts, 'HHMMSS')}`;
    const lat = `${DDtoDDSStr(p.lat, 7)}`; // correct?
    const lon = `${DDtoDDSStr(p.lon, 8)}`;
    const gpsAlt = `${p.alt.toFixed(0).padStart(5, '0')}`;
    const bRecord = `B${time}${lat}N${lon}EA00000${gpsAlt}`;
    return str.concat('', bRecord);
  }, '');

  // B091938.4624909N.00806690E.A0000002143
  return `${headers}${fixes}`;
};
