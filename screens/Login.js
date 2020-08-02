import * as React from 'react';
import {Image, StyleSheet, View, Dimensions , ActivityIndicator, ToastAndroid} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; // to be installed
import AsyncStorage from '@react-native-community/async-storage'
import {SocialIcon, Text, Icon} from 'react-native-elements';

import { Button, TextInput  } from 'react-native-paper';

const { width } = Dimensions.get('window');

const axios = require('axios');
// const localAddress = " 192.168.100.7";
const localAddress = "192.168.43.62";

// var ErrorsMsgs = [];
var errors = [];

export default class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    spinner: false,
    loading: false,
    disabled: false,
    success: false,
    errors : [],
    session: {}
  }

  componentDidMount(){
    // setImmediate (() => {
    // })
    this.setState({errors : []});
    errors = [];
    // ErrorsMsgs = [];
  }

  setSession = async (data) => {
    console.warn('setSession called');
    await AsyncStorage.setItem('user', JSON.stringify(data))
  }
  
   isLoggedIn = async () => {
    try {
      await AsyncStorage.getItem('session').then( (data) => {
          // console.warn(data)
          this.setState({
            session: data
          })
      });

      return this.state.session;

    } catch(error) {
      // console.warn(error)
    }
  }



  async test() {
    // const session  = 
     console.warn("Is logged in ? " + await this.isLoggedIn());
  };

  login = async () =>  {

    this.setState({errors : []});
    errors = [];
    // ErrorsMsgs = [];
    
    var user = {
      email: this.state.email,
      password: this.state.password
    }

     await axios.post('http://' + localAddress + ':3000/login', user)
      .then(res => {
        // console.warn(res.data)
         if(res.data.length != 0) {
          var user = {
            id : res.data[0].id,
            username: res.data[0].username,
            email: res.data[0].email,
            phone: res.data[0].phone,
            created: res.data[0].phone,
          }
          this.setSession(user);

         } else {
          errors.push('Invalid Credentials.\nWrong Email or password')
          this.setState({
            errors: errors
          })
         }
      })
 };

 render() {
  const {errors} = this.state;
  const ErrorsMsgs = (
    <View style={styles.errors}>
    {errors.map(error => {
        return (<Text key={1}>{error}</Text>)
    })}
    </View>
  )

  async function  _retrieveData () {

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
  var session = _retrieveData();
  return (
    <>
    <View style={styles.inner}>
      <View>
          <Text style={styles.textGray}>
            Login into Ame to dicover what's new
          </Text>
      </View>
      <View style={styles.Form}>

        {(errors.length != 0 ? ErrorsMsgs : null)}

      <View style={styles.inputContainer}>
          <TextInput 
            keyboardType="email-address"
            label="Email"
            placeholder="Email"
            returnKeyType="next"
            onChangeText={(email) => this.setState({email : email})}

          />
      </View>
        <View style={styles.inputContainer}>

          <TextInput 
            secureTextEntry
            label="Password"
            placeholder="******"
            returnKeyType="go"
            onChangeText={(password) => this.setState({password : password})}
          />
        </View>
        <View style={styles.inputContainer}>

            <Button
                loading={this.state.loading}
                disabled={this.state.disabled}
                mode="contained"
                buttonStyle={styles.button}

                type="solid"
                onPress= {() => {console.warn(session)}}
            > Login</Button>
        </View>
        </View>
    </View>
</>
  );
}

}

const styles = StyleSheet.create({
  Form :{
    // flex:
    alignItems: "center",
  },
  textGray: {
    fontSize: 20,
    textAlign: 'center',
},
  inner: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    
  },
  Container: {
    paddingVertical: 120,
    width: '100%',
    // marginVertical: 12,
    // backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 12,
    // backgroundColor: '#fff',
  },
  button: {
    // width: '100%',
    // marginVertical: 10,
    marginLeft:10,
    marginRight:10
  },
  
  contentContainer: {
    paddingTop: 30,
  },
  errors : {
    width: "100%", 
    backgroundColor: "#FFA07A",
    borderColor: 'red',
    borderRadius: 4, 
    borderWidth:1,
    marginTop: 8, 
    padding: 5,
}
});

