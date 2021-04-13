import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import CustomListItem from "../../components/CustomListItem/CustomListItem";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
const ChatsScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [chatId, setchatId] = useState("");
  const userId = auth.currentUser.uid;

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .where("userRecivingId", "==", userId)
      .onSnapshot((snapshot) =>
        setchatId(
          snapshot.docs.map(
            (doc) => doc.data().userRecivingId + doc.data().userSendingId
          )
        )
      );
    return unsubscribe;
  }, []);
  console.log(chatId[0]);
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .where("docId", "==", chatId[0])
      .onSnapshot((snapshot) => {
        setChats(
          {
            id: snapshot.id,
            data: snapshot.data(),
          },
        );
        console.log(snapshot.data());
      });

    return unsubscribe;
  }, [chatId]);

  const enterChat = (id, chatName) => {
    navigation.navigate("RideChatScreen", {
      id,
      chatName,
    });
  };
  // console.log(chats);
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

export default ChatsScreen;
