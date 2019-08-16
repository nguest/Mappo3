import MapboxGL from '@react-native-mapbox-gl/maps';
import React, { Component } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import mapboxApiKey from '../../config';
import Geolocation from '@react-native-community/geolocation';


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
    MapboxGL.locationManager.start();
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(location)
        this.setState({ location });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.positionWatchID = Geolocation.watchPosition(position => {
      this.setState({position});
    });
  }

  componentWillUnmount() {
    this.positionWatchID != null && Geolocation.clearWatch(this.watchID);
  }

  onUserLocationUpdate = (location) => {
    console.log({location})
    const { latitude, longitude, altitude, heading, accuracy, speed } = location.coords;
    this.setState({
      timestamp: location.timestamp,
      latitude,
      longitude,
      altitude,
      heading,
      accuracy,
      speed,
    });
  }

  render() {
    console.log({ p: this.state.position })
    //const x = Geolocation.watchPosition(this.onUserLocationUpdate);

    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            zoomLevel={10}
            showUserLocation
            onUserLocationUpdate={this.onUserLocationUpdate}
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
