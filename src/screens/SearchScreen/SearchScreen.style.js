import { StyleSheet } from "react-native";
import { colorGreen } from "../../constants/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  boxTitle: {
    widht: "100%",
    flexDirection: "row",
    marginVertical: 24,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "500",
  },
  subTitle: {
    marginTop: 50,
    marginBottom: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  containerCategories: {
    justifyContent: "space-around",
    width: "100%",
  },

  rowCategories: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 100,
  },
  categoryItem: {
    width: "45%",
    height: 100,
    backgroundColor: colorGreen.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    marginVertical: 12,
    borderRadius: 4,
  },
  titleCategory: {
    color: "#fff",
    fontWeight: "500",
  },
  columnWrapperStyle: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  gifImage: {
    width: 100,
    height: 100,
    marginLeft: 8,
  },
});
