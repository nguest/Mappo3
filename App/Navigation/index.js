import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

import s from '../styles';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
},
{
  initialRouteName: 'Home',

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
  },
});


export default TabNavigator;
