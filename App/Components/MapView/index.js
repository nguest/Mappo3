import MapboxGL from '@react-native-mapbox-gl/maps';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import mapboxApiKey from '../../config';

const { height, width } = Dimensions.get('window');
MapboxGL.setAccessToken(mapboxApiKey);


export default class Map extends Component {
  state = {
    timestamp: 0,
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    heading: 0.0,
    accuracy: 0.0,
    speed: 0.0,
  };


  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    console.log('mount')
    MapboxGL.locationManager.start();
  }

  onUserLocationUpdate(location) {
    console.log({location})
    this.setState({
      timestamp: location.timestamp,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      heading: location.coords.heading,
      accuracy: location.coords.accuracy,
      speed: location.coords.speed,
    });
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            zoomLevel={10}
            showUserLocation
            onUserLocationUpdate={this.onUserLocationUpdate}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            style={styles.map}>
            <MapboxGL.Camera followZoomLevel={12} followUserLocation />
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: height - 100,
    width,
    backgroundColor: 'red',
  },
  map: {
    flex: 1,
  },
});
