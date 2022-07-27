import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  RefreshControl
} from "react-native";
import { Card, Button, Icon, Image } from  "@rneui/themed";
import { responsiveHeight, responsiveWidth, responsiveFontSize, responsiveScreenFontSize } from "react-native-responsive-dimensions";
import {
  useNavigation,
  StackActions,
  useRoute,
} from "@react-navigation/native";
import { colors } from "../style/color";
import axios from "axios";

export default function VehicleAlerts({ navigation, route }) {
  //const navigation = useNavigation();
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios
    .get("https://randomuser.me/api/?results=30")
    .then((response) => {
      setMasterDataSource(response.data.results);
    })

    .catch((error) => {
      console.error(error);
    });
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
      axios
        .get("https://randomuser.me/api/?results=30")
        .then((response) => {
          setMasterDataSource(response.data.results);
        })

        .catch((error) => {
          console.error(error);
        });
    
  }, []);

  const abrirGoogleMaps = (lat, lon) => {
    const location = `${lat},${lon}`;
    Linking.openURL(`http://maps.google.com/maps?q=${location}&amp;z=14`);
  };

  const ItemView = ({ item }) => {

    console.log(item)
    return (
      <View style={styles.backgroundFlat}>
        <TouchableOpacity onPress={() => abrirGoogleMaps(item.location.coordinates.latitude, item.location.coordinates.longitude)}>
          <Card containerStyle={{ ...styles.cardContainer }}>
          <Card.Title>Contact information</Card.Title>
          <View style={styles.container}>
            <Image  source={{uri: item.picture.medium}} style={styles.tinyProfile}/>
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={styles.h4}>{item.name.title} {item.name.first} {item.name.last} </Text>
            <Text style={styles.h2}>{item.email} </Text>
            </View>
          </View>
          
          <View style={styles.dataInformation}>
          <Icon type="material-community" name="cellphone" size={20} />
          <Text style={styles.textInformation}>{item.phone} </Text>
          </View>

          <View style={styles.dataInformation}>
          {item.gender == "male" ? <Icon type="material-community" name="gender-male" size={20} /> : <Icon type="material-community" name="gender-female" size={20} />}
          <Text style={styles.textInformation}>{item.gender} </Text>
          </View>

          <View style={styles.dataInformation}>
          <Icon type="material-community" name="home" size={20} />
          <Text style={styles.textInformation}>{item.location.street.name}, {item.location.city} </Text>
          </View>

          <View style={styles.dataInformation}>
          <Icon type="material-community" name="map-marker" size={20} />
          <Text style={styles.textInformation}>{item.location.coordinates.latitude}, {item.location.coordinates.longitude} </Text>
          </View>

          </Card>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor:"white"}}>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
      <Text style={{ ...styles.textView, color: "red",fontSize: responsiveFontSize(4.5), paddingTop:80}}>React Native SST</Text>
      <TouchableOpacity style={{justifyContent:"center", paddingTop:80}} onPress={() => navigation.dispatch(StackActions.pop())} ><Image style={styles.tinyLogo} source={require("../../assets/logout.png")} /></TouchableOpacity>
      </View>
        <FlatList
          data={masterDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          maxToRenderPerBatch={10}
          windowSize={10}
          refreshControl={<RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />}
        />

   

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  h2:{
    fontWeight:'bold',
    color: "black",
    paddingTop:10,
    fontSize:10,
    width:150
},
h4:{
  fontSize:15,
  fontWeight:'bold',
  color: "black",
},
dataInformation:{
 flexDirection: "row",
 paddingTop:15,
 paddingHorizontal:10
},
textInformation:{
paddingLeft:15
 },
  textView: {
    fontSize: responsiveFontSize(2),
    textAlign:"center",
    color: "black",
    fontWeight: "bold",
  },
  cardContainer: {
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 5,
    shadowColor: "#000",
    borderRadius: 15,
    marginBottom: 10,
    width:"90%"
  },
  backgroundFlat: {
    backgroundColor: "white",
  },
  btnContainerClose: {
    paddingBottom:50,
    width: "100%",
  },
  btnClose: {
    backgroundColor: colors.blueNavy,
  },
  centerImage:{
    alignSelf:"center",
    paddingTop:20
  },
  tinyProfile:{
    borderRadius:50,
    width: 80,
    height: 80,
  },
  tinyLogo:{
    width: 50,
    height: 50,
  }
});
