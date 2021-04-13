import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert("credintial error"));
  };

  return (
    <KeyboardAvoidingView style={style.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={style.inputContainer}>
        <Input
          placeholder="Email"
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={style.button} title="Login" onPress={signIn} />
      <Button
        containerStyle={style.button}
        type="outline"
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 30 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
