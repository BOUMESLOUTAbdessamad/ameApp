//Moduls
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

//Screens
import TabBarIcon from '../components/TabBarIcon';
import Notifications from '../screens/Notifications';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import TVShows from '../screens/TVShows';
import Movies from '../screens/Movies';

//Constants
import Colors from '../constants/Colors';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Ame';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  navigation.setOptions({
    headerTitle: getHeaderTitle(route) ,
    headerStyle: {
      height: 70, 
      backgroundColor: Colors.tintColor,
    },
    headerTitleStyle: {
      color: "#EEE",
    },
  });

  return (
    <BottomTab.Navigator 
      tabBarOptions= {{
        activeTintColor: Colors.tintColor,
        // keyboardHidesTabBar: true,
      }}>

      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
      />

    <BottomTab.Screen
        name="tvShows"
        component={TVShows}
        options={{
          title: 'TV Shows',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="tv" />,
        }}
      />

    <BottomTab.Screen
        name="movies"
        component={Movies}
        options={{
          title: 'Movies',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="movie" />,
        }}
      />
      <BottomTab.Screen
        name="notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="notifications" />,
        }}
      />

      <BottomTab.Screen
      name="profile"
      component={Profile}
      options={{
        title: 'My Profile',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="person" />,
      }}
    />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'home': return 'Home';
    case 'movies': return 'Movies';
    case 'tvShows': return 'TV Shows';
    case 'notifications': return 'Notifications';
    case 'profile': return 'My Profile';

  }
}

