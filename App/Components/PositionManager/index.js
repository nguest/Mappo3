import React, { Component } from 'react';
import Geolocation from '@react-native-community/geolocation';
//import styles from './styles';

export default class PositionManager extends Component {
  state = {
    position: {},
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        //const location = JSON.stringify(position);
        this.setState({ position });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.positionWatchID = Geolocation.watchPosition(position => {
      console.log('watchPosition', position)
      this.setState({position});
      this.props.getCurrentPosition(position);
    });
  }

  componentWillUnmount() {
    this.positionWatchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    return null;
  }
}

