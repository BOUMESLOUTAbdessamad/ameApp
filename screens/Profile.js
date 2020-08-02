import  * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import {Icon} from "react-native-elements";

import {List} from 'react-native-paper';

class Profile extends React.Component {

    constructor(props) {
        super(props); 
    }

    render () {
      const navigation = this.props.navigation;

        return (
            <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {/* <View style={styles.getStartedContainer}>
                  <Text style={styles.textGray}>
                    Account
                  </Text>
                </View> */}
                <List.Section>
                <List.Subheader style={{fontSize: 16}}>Abdessamad</List.Subheader>
                <View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
                  <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Watchlist')}}>
                    <List.Item style={styles.listItem} title="Watchlist" left={() =>  <Icon
                      name="bookmark"
                      size={32}
                      color="#555"
                      type="material"
                    /> }/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('UserReviews')}}>
                    <List.Item
                    style={styles.listItem}
                      title="My reviews"
                      left={() => <Icon
                        name="star"
                        size={32}
                        color="#555"
                        type="material"
                      />}
                    />
                  </TouchableOpacity>
                  </View>
                  
              </List.Section>
              </ScrollView>
          </View>
      
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  
    listItem: {
      // minWidth: "47%",
      margin: 5,
      fontSize: 25,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: 'rgba(200,200,200,0.2)', 
      backgroundColor: 'rgba(200,200,200,0.4)'
      // textAlign: 'center',
    },

    contentContainer: {
      paddingTop: 14,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });
  
  
export default Profile;