import React, { Component } from 'react';
import { object } from 'prop-types';
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
  if (!currentTrack) return null;
  const parsedCoords = currentTrack.map((point) => [point.coords.longitude, point.coords.latitude]);
  const lineString = makeLineString(parsedCoords);



  return (
    <MapboxGL.ShapeSource id="routeSource" shape={lineString}>
      <MapboxGL.LineLayer
        id="routeFill"
        style={{
          lineColor: '#ff0000',
          lineCap: MapboxGL.LineJoin.Round,
          lineWidth: 3,
          lineOpacity: 0.84,
        }}
        belowLayerID="originInnerCircle"
      />
    </MapboxGL.ShapeSource>
  );
}

export default class Map extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    MapboxGL.locationManager.start();
  }

  render() {
    console.log({ p: this.props.currentPosition });

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
            { renderTrack(this.props.currentTrack) }
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    );
  }
}

Map.propTypes = {
  currentPosition: object,
};
