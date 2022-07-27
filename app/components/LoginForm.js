import React, { useState} from "react";
import {
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { isEmpty } from "lodash";
import { colors } from "../style/color";
import { SafeAreaView } from "react-native-safe-area-context";


export default function LoginForm() {
  const navigation = useNavigation();
  const [formData, setformData] = useState(defaultFormValue());
  const [showPassword, setshowPassword] = useState(false);

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      Alert.alert("Campos vacios", "", [{ text: "Aceptar" }], {
        cancelable: true,
      });
    } else if (formData.email == "111" && formData.password == "111") {
      setformData("");
      navigation.navigate("Home", {});
    }else { 
        Alert.alert("Correo y/o Contraseña erronea", "", [{ text: "Aceptar" }], {
        cancelable: true,
      });
    }
  };

  return (
    <View style={styles.form}>
      <Input
        name="correo"
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        autoCapitalize={"none"}
        keyboardType={"email-address"}
        onChange={(e) => onChange(e, "email")}
        value={formData.email}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        autoCapitalize={"none"}
        onChange={(e) => onChange(e, "password")}
        password={true}
        value={formData.password}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />

      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: responsiveHeight(4),
    width: "95%",
  },
  btnContainerRestablcer: {
    marginTop: responsiveHeight(4),
    width: "95%",
  },
  btnLogin: {
    backgroundColor: colors.blueNavy,
  },
  iconRight: {
    color: colors.blueLight,
  }
});
