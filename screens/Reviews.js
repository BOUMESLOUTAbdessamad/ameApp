import * as React from 'react';
import { Image, Platform, StyleSheet, View, Dimensions, ToastAndroid, TouchableOpacity } from 'react-native';
import {Text,Card,  Tile, Divider, Button, Icon} from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';

import { ScrollView } from 'react-native-gesture-handler';

import Spinner from 'react-native-loading-spinner-overlay';

import Colors from '../constants/Colors';

// import isLoggedIn from '../Heplers/Session';

const { width } = Dimensions.get('window');
const axios = require('axios');
// const localAddress = "192.168.100.7";
const localAddress = "192.168.43.62";

// var isLoggedIn = require('../Heplers/Session');

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      movie_id: props.route.params.id,
      movie_title: props.route.params.movie_title,
      release_date: props.route.params.release_date,
      spinner: false,
      no_rev_msg: false
    }
}

async edit_review() {
    const navigation = this.props.navigation;
    // const session = await this.isLoggedIn();

    const data = await AsyncStorage.getItem('user')
    const session = JSON.parse(data)
    // console.warn(await isLoggedIn());

    if(!session) {
      navigation.navigate('Login');

    } else {
      navigation.navigate('AddReview',
        {
          movie_id : this.state.movie_id,
          title : this.state.movie_title,
          release_date : this.state.release_date
        });
    }
}

componentDidMount(){
  setImmediate (() => {
    this.setState({
        spinner: true
    }) 
  })

  axios.post('http://' + localAddress + ':3000/get_reviews', {entry_id: this.state.movie_id, entry: "movies"})
    .then(res => {
      this.setState({
          reviews : res.data,
          spinner: false,
          no_rev_msg: false
      })
    })
}

    NoReviews() {
      if(reviews.length == 0) {
        this.setState({
          no_rev_msg: true
          })
        }
    }

    render() {
      const navigation = this.props.navigation;

      navigation.setOptions({
        headerTitle: "User reviews" ,
      });
      
      const { reviews } = this.state;

      function Spoiler() {
        return (
          <Text style={{color: "red"}}>
            Warning ! there is Spoilers here
          </Text>
        )
      }
      const ReviewsList =  (
        reviews.map(review =>
          {

            return(
              <TouchableOpacity  key={review.id} activeOpacity={.9} >
                  <Card key={review.id}>
                    <View style={{ 
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }} 
                      > 
                        <Text h4 h4Style={{fontSize: 15, width: 290}} >
                            {review.title}
                        </Text>
                        <Icon
                          name="star"
                          type="material"
                          size={22}
                          color="#DAA520"
                          style={{marginRight: 5}}
                        />
                        <Text style ={{fontSize: 18, fontWeight: "bold"}} >
                            {review.score}<Text style ={{fontSize: 12}} >/10</Text>
                        </Text>
                      </View>
                      {(review.spoiler == 1 ? Spoiler() : null)}
                      <Text>
                          {review.content}
                      </Text>
                    </Card>
                </TouchableOpacity>
              )
          })
      )
        return (
            <View style={styles.container}>
            <Spinner
              visible={this.state.spinner}
              // textContent={'Loading, Please wait...'}
              textStyle={{color: Colors.tintColor}} 
              color={Colors.tintColor}
              overlayColor="rgba(255, 255, 255, 1)"
              size="large"
            />
            
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text style={styles.textGray}>
                      {this.state.movie_title}
                    </Text>
                </View>
                {this.state.no_rev_msg == true ?
                    <Text style={styles.textGray}>No reviews</Text> 
                : null}
                {ReviewsList}
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.TouchableOpacityStyle}
              onPress={() => {this.edit_review()}}
            >
              <Icon
                reverse
                name="create"
                type="material"
                size={28}
                color={Colors.tintColor}
              />
            </TouchableOpacity>
            </View>

        );
    }
}
Reviews.navigationOptions = {
  header: null,
  headerTitle: 'User reviews'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  textGray: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  TouchableOpacityStyle: {
    elevation: 10, // Android
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: { height: 1, width: 10 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 1, //IOS
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 20,
    borderRadius:30

  },
});
