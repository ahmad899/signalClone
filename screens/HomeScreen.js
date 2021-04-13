import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";


const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: {
        color: "black",
        alignSelf: "center",
      },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpactiy={0.5} onPress={signOutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 30,
          }}
        >
          <TouchableOpacity activeOpactiy={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpactiy={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("chatScreen", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});





  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      /* .where("userSendingId", "==", userId) */
      .doc(chatId)
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [chatId]);