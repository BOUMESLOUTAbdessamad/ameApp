import {ToastAndroid} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import { State } from 'react-native-gesture-handler';

const axios = require('axios');
// const localAddress = "192.168.100.7";
const localAddress = "192.168.43.62";  

const MoviesController = {

    add_to_watchlist :  async (movie) => {
        const showToast = () => {
          ToastAndroid.show("Added to watchlist !", ToastAndroid.LONG, ToastAndroid.CENTER);
        };
        if(movie) {
          const data = {
            user : 1,
            movie: movie.id,
          }

        await axios.post('http://' + localAddress + ':3000/add_to_watchlist/', data)
        .then(res => {
          
          if(res.data.insertId != 0) {
            showToast();
          }
    
          }) 
        }

      }
}

export default MoviesController;