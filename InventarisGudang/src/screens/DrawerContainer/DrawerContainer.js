import React from "react";
import { View, Alert } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import { auth } from "../Login/LoginScreen";

export default function DrawerContainer(props) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch(error => alert(error.message))
  }

  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="RECORD"
          source={require("../../../assets/icons/record.png")}
          onPress={() => {
            navigation.navigate("Record");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="STOCKS"
          source={require("../../../assets/icons/stocks.png")}
          onPress={() => {
            navigation.navigate("Stocks");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="ADD"
          source={require("../../../assets/icons/add.png")}
          onPress={() => {
            navigation.navigate("Add");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="TAKE"
          source={require("../../../assets/icons/take.png")}
          onPress={() => {
            navigation.navigate("Take");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="PROFILE"
          source={require("../../../assets/icons/user.png")}
          onPress={() => {
            navigation.navigate("Profile");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="LOG OUT"
          source={require("../../../assets/icons/logout.png")}
          onPress={() => {
            handleSignOut();
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
