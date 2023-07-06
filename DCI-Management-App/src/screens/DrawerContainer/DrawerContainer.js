import React, { useState } from "react";
import { View, Alert, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import { auth } from "../Login/LoginScreen";

export default function DrawerContainer(props) {
  const [isProductionGroupOpen, setIsProductionGroupOpen] = useState(false);
  const [isMarketingGroupOpen, setIsMarketingGroupOpen] = useState(false);
  const [isAnalyticsGroupOpen, setIsAnalyticsGroupOpen] = useState(false);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch(error => alert(error.message));
  };

  const { navigation } = props;

  const toggleProductionGroup = () => {
    setIsProductionGroupOpen(!isProductionGroupOpen);
  };

  const toggleMarketingGroup = () => {
    setIsMarketingGroupOpen(!isMarketingGroupOpen);
  };

  const toggleAnalyticsGroup = () => {
    setIsAnalyticsGroupOpen(!isAnalyticsGroupOpen);
  };

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
          title="LOG DATA"
          source={require("../../../assets/icons/logdata.png")}
          onPress={() => {
            navigation.navigate("Record");
            navigation.closeDrawer();
          }}
        />

        <MenuButton
          title={`MARKETING${isMarketingGroupOpen ? "   ↑" : "   ↓"}`}
          source={require("../../../assets/icons/marketing.png")}
          onPress={toggleMarketingGroup}
        />
        {isMarketingGroupOpen && (
          <View style={styles.DropList}>
            <Text>Coming Soon!</Text>
          </View>
        )}

        <MenuButton
          title={`PRODUCTION${isProductionGroupOpen ? "   ↑" : "   ↓"}`}
          source={require("../../../assets/icons/production.png")}
          onPress={toggleProductionGroup}
        />
        {isProductionGroupOpen && (
          <View style={styles.DropList}>
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
          </View>
        )}

        <MenuButton
          title={`ANALYTICS${isAnalyticsGroupOpen ? "   ↑" : "   ↓"}`}
          source={require("../../../assets/icons/stocks.png")}
          onPress={toggleAnalyticsGroup}
        />
        {isAnalyticsGroupOpen && (
          <View style={styles.DropList}>
            <MenuButton
              title="CLIENT INFO"
              source={require("../../../assets/icons/clientinfo.png")}
              onPress={() => {
                navigation.navigate("Record");
                navigation.closeDrawer();
              }}
            />

            <MenuButton
              title="INCOME"
              source={require("../../../assets/icons/income.png")}
              onPress={() => {
                navigation.navigate("Record");
                navigation.closeDrawer();
              }}
            />
          </View>
        )}

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