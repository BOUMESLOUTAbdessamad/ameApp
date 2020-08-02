import * as React from "react";
import { View, StyleSheet, Dimensions, Image, ToastAndroid } from "react-native";
import { Text, Tile, Divider, Icon } from "react-native-elements";
import { Button, Colors } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import Spinner from 'react-native-loading-spinner-overlay';

import { Chip } from 'react-native-paper';

// import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');
const axios = require('axios');
// const localAddress = "192.168.100.7";
const localAddress = "192.168.43.62";
export default class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      // in_watchlist: false,
      id: props.route.params.id,
      textBtn: "Add to watchlist",
      icon: "add",
      colorBtn: Colors.blue400,
      reviews_count: 0
    }
  }

  componentDidMount() {
    setImmediate(() => {
      this.setState({
        spinner: true
      })
    })

    axios.post('http://' + localAddress + ':3000/get_movie', { movie: this.state.id })
      .then(res => {
        if (res.data[1][0]) {
          this.setState({
            textBtn: "In watchlist",
            icon: "done"

          })
        } else {
          this.setState({
            textBtn: "Add to watchlist",
            icon: "add"

          })
        }
        this.setState({
          movie: res.data,
          spinner: false,

        })
      })

    axios.post('http://' + localAddress + ':3000/count_reviews', { movie: this.state.id })
      .then(res => {

        // console.warn(res.data);
        this.setState({
          reviews_count: res.data[0].reviews_count,

        })

      })
  }

  add_to_watchlist = async (movie) => {
    const showToast = () => {
      ToastAndroid.show("Added to watchlist !", ToastAndroid.LONG, ToastAndroid.CENTER);
    };
    if (movie) {
      const data = {
        user: 1,
        movie: movie.id,
      }

      await axios.post('http://' + localAddress + ':3000/add_to_watchlist/', data)
        .then(res => {

          if (res.data.insertId != 0) {
            showToast();
            this.setState({
              textBtn: "In watchlist",
              icon: "done"
            })
          } else {
            this.setState({
              textBtn: "Add to watchlist",
              icon: "add"
            })
          }

        })
    }
  }

  render() {
    const navigation = this.props.navigation;
    navigation.setOptions({
      headerTitle: null,
    });

    const count = this.state.reviews_count;

    const movie = this.state.movie;
    const genres = []
    var GenresTag = [];

    if (movie && movie[2]) {
      movie[2].forEach(element => {
        genres.push(element.genre);
      });

      GenresTag = (genres.map(genre => {
        return (
          <View>
            <Chip style={styles.Genre} onPress={() => alert('Pressed')} type="outlined">
              {genre.toUpperCase()}
            </Chip>
          </View>
        )
      }))
    }

    async function _retrieveData() {

      try {
        const value = await AsyncStorage.multiGet(['user']);
        // console.warn(value[0]);

        if (value !== null) {
          return value;
        }
        return [];

      } catch (error) {
        console.log(error);
      }

    };

    return (
      <>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            // textContent={'Loading, Please wait...'}
            textStyle={{ color: Colors.tintColor }}
            color={Colors.blue400}
            overlayColor="rgba(0, 0, 0, 1)"
            size="large"
          />
          <ScrollView style={styles.container}>
            {/* <View> */}
            <Tile
              activeOpacity={0.9}
              imageSrc={require('../images/film1.jpg')}
              imageContainerStyle={{ width: "100%" }}
              title={(movie && movie[0] && movie[0][0] && movie[0][0].title ? movie[0][0].title : '')}
              titleStyle={{ fontSize: 24 }}
              contentContainerStyle={{ width: 555, height: 100 }}
            >
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                <Text>{(movie && movie[0] && movie[0][0] && movie[0][0].release_date ? parseInt(movie[0][0].release_date) : '')}</Text>
                {/* {GenresTag} */}
              </View>
            </Tile>
            {/* </View> */}
            <Divider style={{ backgroundColor: "#222" }} />
            <View style={styles.details} >
              <View style={{ width: '30%' }}>
                <Image
                  source={require('../images/download.png')}
                  style={{ width: 118, height: 180 }}
                />
              </View>
              <View style={{ width: '64%' }}>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={styles.genresContainer}
                  ContainerStyle={{ margin: 0, padding: 0 }}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    {GenresTag}
                  </View>
                </ScrollView>
                <Text>
                  {(movie && movie[0] && movie[0][0] && movie[0][0].history ? movie[0][0].history.substr(0, 150) + "..." : '')}
                </Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: "#222" }} />

            <View style={{ padding: 16, backgroundColor: "#EEE" }} >
              <Button
                mode="text"
                contentStyle={{ backgroundColor: Colors.blue400 }}
                textStyle={{ color: "white" }}
                color="white"
                onPress={() => { this.add_to_watchlist(movie[0][0]) }}
                icon={
                  <Icon
                    name={this.state.icon}
                    size={25}
                    color="#EEE"
                    type="material"
                  />
                }
              >
                {this.state.textBtn}
              </Button>
            </View>
            <Divider style={{ backgroundColor: "#222" }} />
            <View style={styles.details}>
              <Button
                color={Colors.blue400}
                style={{ width: 180, height: 64 }}
                onPress={() => { alert('Rate this') }}>
                Rate this
                      </Button>
              <Button
                color={Colors.blue400}
                style={{ width: 180, height: 64 }}
                onPress={() => { navigation.navigate('Reviews', { id: this.state.id, movie_title: movie[0][0].title, release_date: parseInt(movie[0][0].release_date) }) }}
              >
                Reviews ({count})
                      </Button>
            </View>
          </ScrollView>

        </View>
      </>
    );
  }

}

const styles = StyleSheet.create({
  genresContainer: {
    margin: 1,
    padding: 0,
    height: 40
  },

  details: {
    // backgroundColor: "#EEE",
    // height:300,
    padding: 16,
    // flex: 1, 
    flexDirection: 'row-reverse',
    justifyContent: "space-between"
  },
  CardWidth: {
    backgroundColor: '#2A2',

  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: '#fff',
  },

  cardContainer: {
    alignItems: 'center',
    width,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    width: width - 25,
    height: width * 0.6,
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  Genre: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 5,
    borderRadius: 4
  }

});
