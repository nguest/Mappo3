import React, { Component } from 'react';
import { array, object } from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  Dimensions,
  SafeAreaView,
  View,
} from 'react-native';
import { lineString as makeLineString } from '@turf/helpers';
import mapboxApiKey from '../../config';
import styles from './styles';

const { height, width } = Dimensions.get('window');

MapboxGL.setAccessToken(mapboxApiKey);

const renderTrack = (currentTrack) => {
  if (!currentTrack || currentTrack.length < 2) return null;
  const parsedCoords = currentTrack.map((point) => [point[0], point[1]]);
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
        // belowLayerID="originInnerCircle"
      />
    </MapboxGL.ShapeSource>
  );
};

const renderMarkers = (currentTrack) => {
  if (!currentTrack || !currentTrack.length) return null;

  return (
    <MapboxGL.PointAnnotation
      key="track-start"
      id="track-start"
      title="Start"
      coordinate={[currentTrack[0][0], currentTrack[0][1]]}
    />
  );
};

export default class Map extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    MapboxGL.locationManager.start();
  }

  render() {
    const { currentTrack } = this.props;
    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            zoomLevel={10}
            showUserLocation
            // onUserLocationUpdate={this.onUserLocationUpdate}
            // userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            style={styles.map}
          >
            <MapboxGL.Camera followZoomLevel={10} followUserLocation />
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
};
