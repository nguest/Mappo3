import React, { Component } from 'react';
import { array, bool } from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  SafeAreaView,
  View,
} from 'react-native';
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

export default class Map extends Component {
  componentDidMount() {
    MapboxGL.setAccessToken(mapboxApiKey);
    MapboxGL.setTelemetryEnabled(false);
    MapboxGL.locationManager.start();
  }

  render() {
    const { currentTrack, isRecording } = this.props;
    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            zoomLevel={8}
            showUserLocation
            // onUserLocationUpdate={this.onUserLocationUpdate}
            // userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            style={styles.map}
          >
            <MapboxGL.Camera
              zoomLevel={8}
              followZoomLevel={8}
              followUserLocation={isRecording || !currentTrack}
            />
            <MapboxGL.UserLocation />
            { renderTrack(currentTrack) }
            { renderMarkers(currentTrack) }
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    );
  }
}

Map.propTypes = {
  currentTrack: array,
  isRecording: bool,
};
