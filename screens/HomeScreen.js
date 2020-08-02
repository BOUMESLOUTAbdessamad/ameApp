import * as React from 'react';
import { Image, StyleSheet, View, Dimensions, ActivityIndicator, ToastAndroid, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient'; // to be installed

import { Avatar, Button, IconButton, Switch, TouchableRipple, Card, Text, Paragraph, Colors } from 'react-native-paper';
import { Icon } from "react-native-elements";

import Carousel, { PaginationLight } from 'react-native-x-carousel';
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay';
import Login from '../screens/Login';

import MoviesController from '../Controllers/MoviesController';
const { width } = Dimensions.get('window');

const axios = require('axios');
// const localAddress = "192.168.100.7";
const localAddress = "192.168.43.62";

const DATA = [
  {
    coverImageUri: 'https://i.picsum.photos/id/982/536/354.jpg?hmac=xXo1bhVRPwA6K0ttkJqSEghDCDNd7xWKfKpE5kqXlQo',
    cornerLabelColor: '#FFD300',
    cornerLabelText: 'GOTY',
  },
  {
    coverImageUri: 'https://i.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0',
    cornerLabelColor: '#0080ff',
    cornerLabelText: 'NEW',
  },
  {
    coverImageUri: 'https://i.picsum.photos/id/1060/536/354.jpg?blur=2&hmac=0zJLs1ar00sBbW5Ahd_4zA6pgZqCVavwuHToO6VtcYY',
    cornerLabelColor: '#2ECC40',
    cornerLabelText: '-75%',
  },
  {
    coverImageUri: 'https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
    cornerLabelColor: '#2ECC40',
    cornerLabelText: '-20%',
  },
];

const renderItem = data => (
  <View
    key={data.coverImageUri}
    style={styles.cardContainer}
  >
    <View
      style={styles.cardWrapper}
    >
      <Image
        style={styles.card}
        source={{ uri: data.coverImageUri }}
      />
      <View
        style={[
          styles.cornerLabel,
          { backgroundColor: data.cornerLabelColor },
        ]}
      >
        {/* <Text style={styles.cornerLabelText}>
            { data.cornerLabelText }
          </Text> */}
      </View>
    </View>
  </View>
);

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      spinner: false,
      textBtn: "Watchlist",
      icon: "add",
      userWatchlist: []

    }

  }
  change_status = (text) => {
    this.setState({
      textBtn: text
    })
  }
  componentDidMount() {
    SplashScreen.hide();

    setImmediate(() => {

      this.setState({
        spinner: true
      })
    })

    axios.get('http://' + localAddress + ':3000/movies')
      .then(res => {

        for (var i = 0; i < res.data[1].length; i++) {
          for (var j = 0; j < res.data[0].length; j++)

            if (res.data[1][i].movie == res.data[0][j].id) {
              console.warn(res.data[1][i].movie)
              // this.setState({
              //   textBtn: "watchlisted"
              // })
            }
        }
        this.setState({
          movies: res.data[0],
          // watchlist:  res.data[1],
          spinner: false
        })


      })

    axios.post('http://' + localAddress + ':3000/get_watchlist')
      .then(res => {
        this.setState({
          userWatchlist: res.data,
          spinner: false
        })

      })
  }


  state = {
    search: ''
  };

  updateSearch = search => {
    this.setState({ search });
  };



  render() {

    const { movies } = this.state;
    const navigation = this.props.navigation;

    const { userWatchlist } = this.state;

    // ** Movies Rendering**
    const MoviesList = (
      movies.map(movie => {
        // console.warn(watchlist)

        return (
          <TouchableOpacity
            key={movie.id}
            activeOpacity={.9}
            onPress={() => navigation.navigate('MovieView', { id: movie.id })}
          >
            <Card style={{ width: 150, margin: 10 }}>
              <Card.Cover source={require('../images/2020-Mercedes-Benz-CLA-V1-1080.jpg')} />

              <Card.Title
                titleStyle={{ fontSize: 16 }}
                title={movie.title}
                subtitle={parseInt(movie.release_date)}
              // right={() => <IconButton icon="add" onPress={() => {}} />}
              />

              {/* <Card.Actions>
              <Button 
                  // mode="text"
                  style={{width: "100%"}}
                  // textStyle ={{color: Colors.blue400}}
                  color={Colors.blue400}
                  onPress= {() => {MoviesController.add_to_watchlist(movie)}}>
                  {this.state.textBtn}
              </Button>
            </Card.Actions> */}
              <Card.Content>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingTop: 5,
                  }}
                >
                  <Icon
                    name="star"
                    type="material"
                    size={20}
                    color="#DAA520"
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {movie.score.toFixed(1)}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )
      })
    ) // ** Movies Feed**

    // ** watchlist Rendering**
    const UserWatchlist = (userWatchlist && userWatchlist.length != 0 ? (
      <View style={{ backgroundColor: "#FFF", paddingVertical: 10, elevation: 9, marginVertical: 20 }}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.textBorderLeft}>
            From My watchlist
        </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {userWatchlist.map(movie => {
            return (
              <TouchableOpacity
                key={movie.id}
                activeOpacity={.9}
                onPress={() => navigation.navigate('MovieView', { id: movie.movie })}
              >
                <Card style={{ width: 150, margin: 10 }}>
                  <Card.Cover source={require('../images/2020-Mercedes-Benz-CLA-V1-1080.jpg')} />

                  <Card.Title
                    titleStyle={{ fontSize: 16 }}
                    title={movie.title}
                    subtitle={parseInt(movie.release_date)}
                  // right={() => <IconButton icon="add" onPress={() => {}} />}
                  />
                  <Card.Content>
                    <Text>Watchlisted</Text>
                  </Card.Content>
                  {/* <Card.Actions>
              <Button 
                  // mode="text"
                  style={{width: "100%"}}
                  // textStyle ={{color: Colors.blue400}}
                  color={Colors.blue400}
                  onPress= {() => {MoviesController.add_to_watchlist(movie)}}>
                  {this.state.textBtn}
              </Button>
            </Card.Actions> */}
                </Card>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    ) : null) // ** Watchlist Feed**

    // async function add_to_watchlist(id) {
    //   const showToast = () => {
    //     ToastAndroid.show("Added to watchlist !", ToastAndroid.SHORT, ToastAndroid.TOP);
    //   };

    //   const data = {
    //     user : 1,
    //     movie: id,
    //   }

    //   await axios.post('http://' + localAddress + ':3000/add_to_watchlist/', data)
    //   .then(res => {
    //     showToast();
    //     }) 

    // }

    return (

      <View style={styles.container}>

        {/* <Spinner
          visible={this.state.spinner}
          // textContent={'Loading, Please wait...'}
          textStyle={{color: Colors.tintColor}} 
          color={Colors.tintColor}
          overlayColor="rgba(255, 255, 255, 1)"
          size="large"
      /> */}
        <ScrollView>
          <View style={styles.container, { elevation: 1 }}>
            <Carousel
              // pagination={PaginationLight}
              renderItem={renderItem}
              data={DATA}
              loop
            // autoplay
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.textGray}>
              Discover
              </Text>
          </View>

          {UserWatchlist}

          <View style={{ backgroundColor: "#FFF", paddingVertical: 10, elevation: 9, marginVertical: 20 }}>
            <View style={styles.getStartedContainer}>
              <Text style={styles.textBorderLeft}>
                Best rated
                </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {MoviesList}
            </ScrollView>
          </View>
          <View style={{ backgroundColor: "#FFF", paddingVertical: 10, elevation: 9, marginVertical: 20 }}>
            <View style={styles.getStartedContainer}>
              <Text style={styles.textBorderLeft}>
                Follow Us
                </Text>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

// HomeScreen.navigationOptions = {
//   header: null,
// };

const styles = StyleSheet.create({
  CardWidth: {
    backgroundColor: '#2A2',

  },
  container: {
    flex: 1,
    backgroundColor: '#EEE',

  },

  cardContainer: {
    // alignItems: 'center',
    width: width,

  },
  cardWrapper: {
    borderRadius: 4,
    overflow: 'hidden',
    borderRadius: 0
  },
  card: {
    width: width,
    height: width * 0.6,

  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    // borderTopLeftRadius: 8,
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

  contentContainer: {
    paddingTop: 30,
  },

  getStartedContainer: {

    // alignItems: 'center',
    marginVertical: 16,
  },

  textGray: {

    fontSize: 25,
    marginLeft: 16,
    paddingLeft: 10
    // textAlign: 'center,
  },
  textBorderLeft: {
    borderLeftColor: Colors.blue400,
    borderLeftWidth: 5,
    fontSize: 22,
    marginLeft: 16,
    paddingLeft: 10
  }

});

export default HomeScreen;
