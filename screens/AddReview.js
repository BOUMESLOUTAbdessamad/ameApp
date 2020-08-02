import * as React from 'react';
import {Platform,
     StyleSheet,
      View, 
      Dimensions, 
      ToastAndroid, 
      TouchableOpacity, 
      Image,
      KeyboardAvoidingView,
      TouchableWithoutFeedback,
      Keyboard,
      ScrollView
    } from 'react-native';
    
import AsyncStorage from '@react-native-community/async-storage'
import {Text, Divider, Icon, AirbnbRating } from "react-native-elements";
import { Switch, TextInput, Button, Snackbar} from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';

import Spinner from 'react-native-loading-spinner-overlay';

import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');
const axios = require('axios');
// const localAddress = "192.168.100.7";
const localAddress = "192.168.43.62";
var ErrorsMsgs = [];
var errors = [];
export default class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry_id: props.route.params.movie_id,
            movie_title: props.route.params.title,
            release_date: props.route.params.release_date,
            rating: 0,
            title: "",
            content: "",
            spoiler: false,
            entry: 'movies', //Have to be dynamicly passed
            spinner: false,
            loading: false,
            disabled: false,
            errors : [],
            success: false
        }

    }

    _onDismissSnackBar = () =>{
        const navigation = this.props.navigation;
        this.setState({ success: false})
        navigation.navigate('MovieView', {id: this.state.entry_id});

    } ;

    componentWillMount(){
        this.setState({errors : []});
        errors = [];
        ErrorsMsgs = [];
    }

    add_review = ()  => {
        this.setState({errors : []});
        errors = [];
        ErrorsMsgs = [];
        const navigation = this.props.navigation;

        var review = {
            user     : 1,
            entry    : this.state.entry,
            entry_id : this.state.entry_id,
            score    : this.state.rating,
            title    : this.state.title,
            content  : this.state.content,
            spoiler  : this.state.spoiler,
            status   : 'pending'
        }

        if(review.score == 0) {
            errors.push('Add your rating value.');
        }

        if(review.title == "" || review.title.length < 3) {
            errors.push('Invalid Title. Must be more than 3 chars.');
        }

        if(review.content == "" || review.content.length < 10) {
            errors.push('Invalid content. Must be more than 10 chars.');
        }

        if(errors.length == 0) {
            this.setState({
                loading: true,
                disabled: true
            })
            axios.post('http://' + localAddress + ':3000/add_review', review)
                .then(res => {
                    this.setState({
                        loading: false,
                        disabled: false,
                        errors: [],
                        success: true
                    })
                errors = []
                ErrorsMsgs = []

            })

        } else {
            this.setState({
                errors: errors
            })
            ErrorsMsgs = (
                errors.map(error => {
                    return (<Text>{error}</Text>)
                })
            ) 
        }

      }
      _hideModal = () => this.setState({ visible: false });

    render(){
        const navigation = this.props.navigation;

        navigation.setOptions({
            headerTitle: 'Add your review'
          });
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.inner} >
            <ScrollView style={styles.container}>

                <View style= {styles.details} >
                    <View>
                        <Image
                        source={require('../images/download.png')}
                        style={{ width: 90, height: 130 }}
                        />
                    </View>
                    <View style={{width: 300}}>
                        <Text h4 h4Style={{fontSize: 26, fontWeight: "500"}}>
                            {this.state.movie_title}
                        </Text>
                        <Text h4 h4Style={{fontSize: 16, fontWeight: "500"}}>
                            {this.state.release_date}
                        </Text>
                    </View>
                </View>
                <Divider style={{ backgroundColor: "#222" }} />
                {(ErrorsMsgs && ErrorsMsgs.length != 0 ? 
                    <View style={styles.errors}>
                     {ErrorsMsgs}
                    </View>
                : null)}
            <View style={styles.form}>
            <AirbnbRating
                count={10}
                reviews={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                defaultRating={0}
                size={24}
                onFinishRating={(rating) => { this.setState({rating : rating}) }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    label='Headline'
                    type="outlined"
                    underlineColor={Colors.tintColor}
                    selectionColor={Colors.tintColor}
                    // inputContainerStyle={{height:100}}
                    placeholder="Write a headline of your review"
                    returnKeyType="next"
                    onChangeText={(title) => this.setState({title : title})}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    type="outlined"
                    label='Content'
                    underlineColor={Colors.tintColor}
                    selectionColor={Colors.tintColor}
                    numberOfLines={5}
                    multiline={true}
                    placeholder="Content"
                    onChangeText={(content) => this.setState({content : content})}
                />
            </View>
            <View  style={{flex:1, flexDirection: "row", justifyContent: 'space-around'}}>
                <Text > Spoiler </Text>
                <Switch
                    value={this.state.spoiler}
                    onValueChange={(value) => {
                        this.setState({
                            spoiler : value
                        })
                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Button
                    loading={this.state.loading}
                    disabled={this.state.disabled}
                    disabledStyle={{backgroundColor: "#BBB"}}
                    mode="contained"
                    color={Colors.tintColor}
                    // type="solid"
                    onPress= {() => { this.add_review()}}
                > Submit review</Button>

            </View>
            <Text style={{fontSize:11, width: '95%' }}>
                I agree to the terms & conditions of use. The content i'm submitting is true and not copyrighted by somone else.
            </Text>
        </View> 
        </ScrollView>
        <Snackbar
          visible={this.state.success}
          onDismiss={this._onDismissSnackBar}
          action={{
            label: 'Ok',
            onPress: () => {
              // Do something
            },
          }}
        >
          Your review was sent. It will be approuved by our administration after checking.
        </Snackbar>
    </View>

     </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    form :{
        alignItems: "center",

    },
    textContent: {
        borderColor: "#222",
        borderWidth: 1,
    },
    container: {
        flex:1,
    },
    inner: {
        padding: 10,
        flex: 1,
        justifyContent: "space-between"
    },
    textGray: {
        fontSize: 20,
        textAlign: 'center',
    },
    details  : {
        flexDirection: "row-reverse", 
        justifyContent: "space-between",
        alignSelf: "center",
    },
    inputContainer: {
        width: '95%',
        marginVertical: 10,
    },
    errors : {
        borderColor: 'red',
        borderRadius: 4, 
        borderWidth:1,
        marginTop: 8, 
        padding: 5
    }
});
