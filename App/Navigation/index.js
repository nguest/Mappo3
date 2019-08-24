
import React from 'react';
import { createBottomTabNavigator, BottomTabBar, createStackNavigator } from 'react-navigation';
import { format } from 'date-fns';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TracksScreen from '../screens/TracksScreen';
import SingleTrackScreen from '../screens/SingleTrackScreen';

import s from '../styles';

const TracksNavigator = createStackNavigator({
  Tracks: {
    screen: TracksScreen,
    navigationOptions: () => ({
      title: 'Tracks',
    }),
  },
  SingleTrack: {
    screen: SingleTrackScreen,
    navigationOptions: ({ navigation }) => {
      const track = navigation.getParam('track', 'Flight');
      return {
        title: `Flight on ${format(track.date, 'DD/MM/YYYY')}`,
      };
    },
  },
},
{
  initialRouteName: 'Tracks',
});

const TabBarComponent = (props) => (<BottomTabBar {...props} />);

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
  Tracks: TracksNavigator,
},
{
  initialRouteName: 'Home',
  tabBarComponent: (props) => (
    <TabBarComponent
      {...props}
      style={{ borderTopColor: '#FF0000', height: 20 }}
    />
  ),


  // defaultNavigationOptions: ({ navigation }) => ({
  //   tabBarIcon: ({ focused, horizontal, tintColor }) => {
  //     const { routeName } = navigation.state;
  //     let IconComponent = Ionicons;
  //     let iconName;
  //     if (routeName === 'Home') {
  //       iconName = `ios-information-circle${focused ? '' : '-outline'}`;
  //       // Sometimes we want to add badges to some icons.
  //       // You can check the implementation below.
  //       IconComponent = HomeIconWithBadge;
  //     } else if (routeName === 'Settings') {
  //       iconName = `ios-options`;
  //     }

  //     // You can return any component that you like here!
  //     return <IconComponent name={iconName} size={25} color={tintColor} />;
  //   },
  // }),
  tabBarOptions: {
    activeTintColor: s.colors.fg,
    inactiveTintColor: 'gray',
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
  },
});


export default TabNavigator;
