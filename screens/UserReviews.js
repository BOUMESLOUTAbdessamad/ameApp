import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon, Card, Button } from "react-native-elements";
import Moment from 'moment';

import { Menu, Provider, Divider, Colors, Portal, Paragraph, Dialog } from "react-native-paper";

// import MyComponent from '../components/MyComponent';
import DialogDecision from '../components/Dialog';


const axios = require("axios");
// const localAddress = "192.168.100.7";
const localAddress = "192.168.43.62";



class UserReviews extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         user: 1,
         Reviews: [],
         collapsed: false,
         alert: false
      };
   }
   componentDidMount() {
      setImmediate(() => {
         this.setState({
            spinner: true,
         });
      });

      axios
         .post("http://" + localAddress + ":3000/get_user_reviews")
         .then((res) => {
            //  console.warn(res.data)
            this.setState({
               Reviews: res.data,
               spinner: false,
            });
         });
   }

   collapsed = () => {  // TODO
      if (this.state.collapsed == false) {
         this.setState({
            collapsed: true,
         });
         console.warn(this.state.collapsed);
      } else {
         this.setState({
            collapsed: false,
         });
         console.warn(this.state.collapsed);
      }
   };

   // TODO delete review
   delete_review = (id) => {
      var review = { id: id }
      // setVisible(true)

      this.setState({
         alert: true
      })
      // alert('boo')
      //Do you want to delete ?

      // if(true) {
      //    axios
      //    .post("http://" + localAddress + ":3000/delete_review", review)
      //    .then((res) => {
      //      console.warn(res.data)
      //       // this.setState({
      //       //    Reviews : res.data,
      //       //    spinner : false,
      //       // });
      //    });
      // }

   }



   render() {
      const { Reviews } = this.state;
      const navigation = this.props.navigation;

      Moment.locale('en');

      //Reviews popup menu
      const OptionsMenu = (props) => {
         const [visible, setVisible] = React.useState(false);

         const openMenu = () => setVisible(true);

         const closeMenu = () => setVisible(false);

         return (
            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: "baseline"
               }}>
               <Menu
                  statusBarHeight={-30}
                  // containerStyle={{position: "absolute", width: 210, flexWrap: "wrap-reverse", padding: 0}}
                  style={{ position: "absolute", width: 210, flexWrap: "wrap-reverse", padding: 0, margin: 0 }}
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={<Button type="clear" raised icon={
                     <Icon
                        name="more-vert"
                        size={24}
                        color={Colors.blue400}
                     />
                  } onPress={openMenu} />}>
                  <Menu.Item onPress={() => { this.test('Edit ' + props.name) }} title="Edit" />
                  <Menu.Item onPress={() => { alert('Change rating For ' + props.name) }} title="Change rating" />
                  <Divider />
                  <Menu.Item onPress={() => { onPress = { showDialog } }} title="Delete Review" />
               </Menu>
            </View>
         );
      };

      const DialogDecision = (props) => {
         const [visible, setVisible] = React.useState(false);

         const showDialog = () => setVisible(props.name);

         const hideDialog = () => setVisible(false);

         return (
            <View>
               <Button onPress={showDialog}>Show Dialog</Button>
               <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                     <Dialog.Title>Alert</Dialog.Title>
                     <Dialog.Content>
                        <Paragraph>Do you realy want to delele this review ?</Paragraph>
                     </Dialog.Content>
                     <Dialog.Actions>
                        <Button onPress={hideDialog}>Delete</Button>
                        <Button onPress={hideDialog}>Cancel</Button>
                     </Dialog.Actions>
                  </Dialog>
               </Portal>
            </View>
         );
      };

      return (
         <Provider>

            <View style={styles.container}>
               <ScrollView
                  style={styles.container}
                  contentContainerStyle={styles.contentContainer}
               >

                  <View style={styles.getStartedContainer}>
                     <Text style={styles.textGray}>My Reviews</Text>
                  </View>
                  <View>

                     {Reviews.map((review) => {
                        return (

                           <Card
                              containerStyle={styles.cardReview}
                              onPress={() => {
                                 alert("boo");
                              }}
                           >
                              {/* <DialogDecision name={this.state.alert}/> */}

                              <View>

                                 <View style={{ flex: 1, flexDirection: "row" }}>

                                    <Image
                                       style={{ width: 64, height: 108 }}
                                       resizeMode="cover"
                                       source={require("../images/2020-Mercedes-Benz-CLA-V1-1080.jpg")}
                                    />
                                    {/* <IconButton
                                      icon="camera"
                                      color={Colors.red500}
                                      size={20}
                                      onPress={() => alert('boo')}
                                    /> */}
                                    <View style={styles.itemConetent}>
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
                                             9/10
                                          </Text>
                                       </View>

                                       <Text style={styles.year}>
                                          Reviewed {Moment(review.release_date).format('MMM DD, YYYY')}
                                       </Text>
                                       <View
                                          style={{
                                             flex: 1,
                                             flexDirection: "row",
                                          }}
                                       >
                                          <Text style={styles.title}>
                                             {review.movie_title}
                                          </Text>
                                       </View>
                                    </View>
                                    <OptionsMenu name={review.review_id} key={review.id} />
                                 </View>
                                 <View style={{ padding: 10 }}>
                                    <Text style={styles.title}>
                                       {review.review_title}
                                    </Text>
                                    <Text>{review.content}</Text>
                                 </View>
                              </View>
                           </Card>
                        );
                     })}
                  </View>
               </ScrollView>
            </View>
         </Provider>
      );
   }
}

const styles = StyleSheet.create({
   cardReview: {
      zIndex: 0,
      paddingLeft: 0,
      paddingVertical: 0,
      paddingRight: 10,
      borderRadius: 4,
      // overflow: "hidden",
   },
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   contentContainer: {
      paddingBottom: 10,
   },

   textGray: {
      marginVertical: 16,
      fontSize: 25,
      textAlign: "center",
   },
   listItem: {
      margin: 10,
      fontSize: 25,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "rgba(200,200,200,0.2)",
      backgroundColor: "rgba(200,200,200,0.4)",
      // textAlign: 'center',
   },
   itemConetent: {
      paddingVertical: 5,
      marginLeft: 8,
      flex: 1,
      flexDirection: "column-reverse",
      justifyContent: "space-evenly",
   },
   title: {
      fontSize: 16,
   },

   year: {
      color: "#888",
   },
});

export default UserReviews;
