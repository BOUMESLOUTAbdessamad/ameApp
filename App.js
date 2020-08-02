/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import { StatusBar, Platform, Button} from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator  } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

import BottomTabNavigator from './navigation/BottomTabNavigator';
import Login from './screens/Login';
import Colors  from './constants/Colors';

import MovieView  from './screens/MovieView';
import Reviews  from './screens/Reviews';
import AddReview from './screens/AddReview';
import UserReviews from './screens/UserReviews';

import Watchlist from './screens/Watchlist';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};



class App extends React.Component {
  constructor(props) {
    super(props);
  }

 render() {
  const navigation = this.props.navigation;

   return (
    <>
      {Platform.OS === 'android' && <StatusBar backgroundColor = "#222"/>}
      {/* <StatusBar backgroundColor = {Colors.tintColor} /> */}
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen
             name="Ame" 
             component={BottomTabNavigator}
             options = {{
              headerRight: () => (
                <Icon
                  type="material"
                  raised
                  name="person"
                  containerStyle={{marginRight: 20}}
                  // raisedColor={Colors.tintColor}
                  color={Colors.tintColor}
                  size={16}
                  onPress={() => alert('boo')}
                  />
              ),
              headerTitleStyle: {
                color: "#EEE",
              },
             }}
            />
            <Stack.Screen name="Login" component={Login} 
              options={{
                gestureDirection: 'horizontal-inverted',
                transitionSpec: {
                  open: config,
                  close: config,
                },
                headerStyle: {
                  height: 70, 
                  backgroundColor: Colors.tintColor,
                },
                headerTitleStyle: {
                  color: "#EEE",
                },

              }}
            />
            <Stack.Screen name="MovieView" component={MovieView} 
 
              options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                headerStyle: {
                  height: 70, 
                  backgroundColor: Colors.tintColor,
                },
                headerRight: () => (
                  <Icon
                  type="material"
                  raised               
                  name="person"
                  containerStyle={{marginRight: 20}}
                  color={Colors.tintColor}
                  size={16}
                  onPress={() => {
                    navigation.navigate(Login)}
                }
                  
                />
                ),
                headerTitleStyle: {
                  color: "#EEE",
                },
              }}
            />
          <Stack.Screen name="Reviews" component={Reviews} 

            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
              headerStyle: {
                height: 70, 
                backgroundColor: Colors.tintColor,
              },
              headerRight: () => (
                <Icon
                type="material"
                raised               
                name="person"
                containerStyle={{marginRight: 20}}
                color={Colors.tintColor}
                size={16}
                onPress={() => {navigation.navigate('Login')}}
              />
              ),
              headerTitleStyle: {
                color: "#EEE",
              },
            }}
            />
          <Stack.Screen name="AddReview" component={AddReview} 
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
              headerStyle: {
                height: 70, 
                backgroundColor: Colors.tintColor,
                
              },
              headerRight: () => (
                <Icon
                type="material"
                raised               
                name="person"
                containerStyle={{marginRight: 20}}
                color={Colors.tintColor}
                size={20}
                onPress={() => {navigation.navigate('Login')}}
              />
              ),
              headerTitleStyle: {
                color: "#EEE",
              },
            }}
            />
            
            <Stack.Screen name="Watchlist" component={Watchlist} 
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
              headerStyle: {
                height: 70, 
                backgroundColor: Colors.tintColor,
                
              },
              headerRight: () => (
                <Icon
                type="material"
                // raised               
                name="search"
                containerStyle={{marginRight: 20}}
                color="white"
                size={20}
                onPress={() => { alert('search')}}
              />
              ),
              headerTitleStyle: {
                color: "#EEE",
              },
            }}
            />
          <Stack.Screen name="UserReviews" component={UserReviews} 
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
              headerStyle: {
                height: 70, 
                backgroundColor: Colors.tintColor,
                
              },
              headerRight: () => (
                <Icon
                type="material"
                // raised
                name="search"
                containerStyle={{marginRight: 20}}
                color="white"
                size={20}
                onPress={() => { alert('search')}}
              />
              ),
              headerTitleStyle: {
                color: "#EEE",
              },
            }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </>
  )}
}

export default App;
