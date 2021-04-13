import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Abc",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={style.container}>
      <StatusBar style="light" />
      <Text h3>Create Signal account</Text>

      <View style={style.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="text"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="profile picture Url (oproinal)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={style.button}
        raised
        title="Register"
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: { width: 300, marginTop: 50 },
  button: {
    width: 200,
    marginTop: 10,
  },
});
