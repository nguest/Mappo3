import React, { useEffect, useRef } from 'react';
import { array, bool, number } from 'prop-types';
import { SafeAreaView, PermissionsAndroid, Platform, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { lineString as makeLineString } from '@turf/helpers';
import mapboxApiKey from '../../config';

import styles from './styles';

const renderTrack = (currentTrack) => {
  if (!currentTrack || currentTrack.length < 2) return null;
  const parsedCoords = currentTrack.map((point) => [point.lon, point.lat]);
  const lineString = makeLineString(parsedCoords, { name: 'track' });

  return (
    <MapboxGL.ShapeSource id="routeSource" shape={lineString}>
      <MapboxGL.LineLayer
        id="routeFill"
        style={{
          lineColor: '#ff0000',
          lineCap: MapboxGL.LineJoin.Round,
          lineWidth: 10,
          lineOpacity: 0.84,
        }}
        // belowLayerID="coveringId"
      />
    </MapboxGL.ShapeSource>
  );
};

const renderMarkers = (currentTrack) => {
  if (!currentTrack || !currentTrack.length) return null;

  return (
    <MapboxGL.PointAnnotation
      key="trackStart"
      id="trackStart"
      title="Start"
      coordinate={[currentTrack[0].lon, currentTrack[0].lat]}
    />
  );
};

const Map = ({ centerCoordinate, currentTrack, isDynamic, isRecording, zoomLevel }) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
      }
      MapboxGL.setAccessToken(mapboxApiKey);
      MapboxGL.setTelemetryEnabled(false);
      MapboxGL.locationManager.start();

      didMountRef.current = true;
    }
    return () => {
      MapboxGL.locationManager.dispose();
    };
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          zoomLevel={8}
          attributionEnabled={false}
          logoEnabled={false}
          // showUserLocation
          style={[styles.map, MapboxGL.StyleURL.Outdoors]}
          // onUserLocationUpdate={this.onUserLocationUpdate}
          //userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        >
          <MapboxGL.Camera
            centerCoordinate={centerCoordinate}
            zoomLevel={zoomLevel}
            followZoomLevel={14}
            followUserLocation={isRecording || !currentTrack}
          />
          {isDynamic && <MapboxGL.UserLocation />}
          {renderTrack(currentTrack)}
          {renderMarkers(currentTrack)}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

Map.defaultProps = {
  currentTrack: [],
  zoomLevel: 14,
};

Map.propTypes = {
  centerCoordinate: array.isRequired,
  currentTrack: array,
  isDynamic: bool.isRequired,
  isRecording: bool.isRequired,
  zoomLevel: number,
};

export default Map;
