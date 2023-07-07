import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, ScrollView, Touchable, StatusBar } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { db, auth } from "../Login/LoginScreen";
import { doc, getDoc, collection } from 'firebase/firestore';

export default function HomeScreen(props) {
  const { navigation } = props;
  const [isAdmin, setIsAdmin] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        top: 0,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const user = auth.currentUser;
    if (user) {
      db.collection("Users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setIsAdmin(userData.status === "admin");
          }
        })
        .catch((error) => {
          console.log("Error checking admin status:", error);
        });
    }
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text>Access denied. You must be an admin to view this screen.</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}