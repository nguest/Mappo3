import MapboxGL from '@react-native-mapbox-gl/maps';
import React, { Component } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
} from 'react-native';
import mapboxApiKey from '../../config';
import styles from './styles';

const { height, width } = Dimensions.get('window');

MapboxGL.setAccessToken(mapboxApiKey);

export default class Map extends Component {

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    MapboxGL.locationManager.start();
  }

  render() {
    console.log({ p: this.props.currentPosition })

    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            zoomLevel={10}
            showUserLocation
            //onUserLocationUpdate={this.onUserLocationUpdate}
            //userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            style={styles.map}>
            <MapboxGL.Camera followZoomLevel={12} followUserLocation />
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    );
  }
}
