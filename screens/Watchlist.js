import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Card, Button } from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';

import { Colors } from 'react-native-paper';

const axios = require('axios');
// const localAddress = "192.168.100.7";
const localAddress = "192.168.43.62";
class Watchlist extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: 1,
      watchlist: [],
      spinner: true,
      btn_loading: false
    }
  }
  componentDidMount() {
    setImmediate(() => {
      this.setState({
        spinner: true
      })
    })

    axios.post('http://' + localAddress + ':3000/get_watchlist')
      .then(res => {

        this.setState({
          watchlist: res.data,
          spinner: false
        })
      })

  }

  remove_watchlist = (id) => {

    if (id) {
      setImmediate(() => {
        this.setState({
          // spinner: true,
          btn_loading: true
        })
      })
      axios.post('http://' + localAddress + ':3000/remove_watchlist', { movie: id })
        .then(res => {
          setImmediate(() => {
            this.setState({
              btn_loading: false
            })
          })
          // console.warn(res.data)

          // React.useCallback(() => {

          // }, []);

        });

    }
  }

  render() {

    const { watchlist } = this.state;
    const navigation = this.props.navigation;


    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          // textContent={'Loading, Please wait...'}
          color={Colors.blue400}
          overlayColor="rgba(0, 0, 0, 1)"
          size="large"
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.textGray}>
              My Watchlist
                  </Text>
          </View>
          <View refreshing={true}>
            {
              watchlist.map(movie => {
                return (
                  <TouchableOpacity
                    key={movie.id}
                    activeOpacity={.9}
                    onPress={() => navigation.navigate('MovieView', { id: movie.movie_id })}
                  >
                    <Card containerStyle={{ paddingLeft: 0, paddingVertical: 0, paddingRight: 1, borderRadius: 4, overflow: 'hidden' }}
                      onPress={() => { alert('boo') }}
                    >
                      <View style={{ flex: 1, flexDirection: 'row' }} >
                        <Image
                          style={{ width: 84, height: 128 }}
                          resizeMode="cover"
                          source={require('../images/2020-Mercedes-Benz-CLA-V1-1080.jpg')}
                        />
                        {/* <IconButton
                            icon="camera"
                            color={Colors.red500}
                            size={20}
                            onPress={() => alert('boo')}
                          /> */}
                        <View style={styles.itemConetent}>
                          <Text style={styles.year}>{parseInt(movie.release_date)}</Text>
                          <View style={{
                            flex: 1,
                            flexDirection: 'row',
                          }} >
                            <Icon
                              name="star"
                              type="material"
                              size={20}
                              color="#DAA520"
                              style={{ marginRight: 5 }}
                            />
                            <Text style={{ fontSize: 15, fontWeight: "bold" }} >
                              9/10
                        </Text>
                          </View>
                          <Text style={styles.title}>{movie.title}</Text>
                        </View>
                        <View>
                          <Button
                            // loading={this.state.btn_loading}
                            containerStyle={{ shadowColor: Colors.yellow200, borderRadius: 100 }}
                            type="clear"
                            icon={{
                              name: "delete",
                              size: 24,
                              color: Colors.red400
                            }}
                            onPress={() => { this.remove_watchlist(movie.movie) }}

                          />
                        </View>
                      </View>

                    </Card>
                  </TouchableOpacity>
                );
              })
            }
          </View>
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
  contentContainer: {
    paddingBottom: 0
  },

  textGray: {
    marginVertical: 16,
    fontSize: 25,
    textAlign: 'center',
  },
  listItem: {
    margin: 10,
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(200,200,200,0.2)',
    backgroundColor: 'rgba(200,200,200,0.4)'
    // textAlign: 'center',
  },
  itemConetent: {
    paddingVertical: 5,
    marginLeft: 8,
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16
  },

  year: {
    color: "#888"
  }
});


export default Watchlist;