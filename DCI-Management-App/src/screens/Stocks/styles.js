import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    width: 250,
    justifyContent: "space-around",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    flex: 1,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  category: {
    fontSize: 14,
    color: "gray",
  },
});

export default styles;
