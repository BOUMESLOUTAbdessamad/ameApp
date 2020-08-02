import AsyncStorage from '@react-native-community/async-storage';

export function isLoggedIn(){
    try {
        return AsyncStorage.getItem('session').then( (data) => {
          // console.warn(data)
        //   this.setState({
        //     session: data
        //   })
      });

    //    this.state.session;

    } catch(error) {
      // console.warn(error)
    }
  }