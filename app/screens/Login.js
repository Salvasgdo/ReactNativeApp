import React from "react";
import { StyleSheet, ScrollView, Image, View, Dimensions } from "react-native";
import LoginForm from "../components/LoginForm";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  return (
    <View style={styles.form}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Image
          source={require("../../assets/login.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.viewContainer}>
          <LoginForm />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  form: {
    flex: 1,
    flexDirection: "row",
    backgroundColor:"white"
  },
  logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(50),
  },

  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
});
