import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./LoginScreen.style";
import ButtonGradient from "../../../components/ButtonGradient/ButtonGradient";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../services/authApi";
import { setUser } from "../../../features/authSlice/authSlice";
import { setTheme } from "../../../features/themeSlice/themeSlice";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [confirmTerms, setconfirmTerms] = useState(false);
  const [triggerLogin, result] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = () => {
    //console.log(email, password);
    triggerLogin({
      email,
      password,
    });
    console.log(result);
    if (result.isSuccess) {
      dispatch(setUser(result.data));
    }
  };

  const seePassword = () => {
    setHidePassword(!hidePassword);
  };

  /* useEffect(() => {
    
  }, []) */

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <Text style={styles.logo}>Gif App</Text>
        {/* <SvgTop /> */}
      </View>

      <View style={styles.container}>
        <Text style={styles.titulo}>Hello !</Text>
        <Text style={styles.subTitle}>Sign In to your account</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="mail-outline"
            size={25}
            color="#ccc"
          />
          <TextInput
            style={styles.inputEmail}
            placeholder="E-mail"
            placeholderTextColor={"gray"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="lock-closed-outline"
            size={25}
            color="#ccc"
          />
          <TextInput
            style={styles.inputEmail}
            placeholder="Password"
            placeholderTextColor={"gray"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={seePassword}>
            <Ionicons
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={25}
              color="#ccc"
              style={styles.iconEye}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <ButtonGradient label={"SIG IN"} onPress={onSubmit} />
        <Text style={styles.noAccount}>Don't have an account?</Text>
        <ButtonGradient
          label={"CREATE ACCOUNT"}
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        />
        <View style={styles.termsContainer}>
          <TouchableOpacity
            onPress={() => {
              setconfirmTerms(!confirmTerms);
            }}
          >
            <Ionicons
              name={confirmTerms ? "checkbox" : "square-outline"}
              size={15}
              color="#7cb799"
            />
          </TouchableOpacity>
          <Text style={styles.terms}>
            Acepto los Terminos y Condiciones del Servicio y la Politica de
            Privacidad de Gif App
          </Text>
        </View>
        <StatusBar style="light" />
      </View>
    </View>
  );
};

export default LoginScreen;
