import { StyleSheet } from "react-native";
import { spacing } from "../../../../../constants/spacing";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: spacing.s,
  },
  title: {
    fontSize: 14,
    marginBottom: spacing.s,
  },
  label: {
    fontSize: 12,
    marginBottom: spacing.s,
  },
  containerCategory: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 1,
    borderRadius: 16,
    paddingTop: 4,
  },

  imageCategory: {
    width: "90%",
    height: 150,
    borderRadius: 16,
    resizeMode: "contain",
    paddingHorizontal: 100,
  },
  scrollContainer: {
    width: "100%",
    /* marginTop: 120, */

    zIndex: 3,
  },
  gifsPrincipalContainer: {
    width: "100%",
    marginTop: 160,
  },
  containerGifsCharacter: {
    marginVertical: spacing.l,
    paddingHorizontal: spacing.s,
  },
  gifsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gif: {
    borderRadius: 10,
    overflow: "hidden",
  },

  imageGif: {
    width: 110,
    height: 110,
  },
  headerListGifs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trendingContainer: {
    width: "100%",
    marginVertical: 8,
  },
  flat: {
    width: "100%",
  },
  wrapperStyle: {
    justifyContent: "space-around",
    /* alignSelf: "stretch", */
  },
  gifTrending: {
    margin: 0,
  },

  imageGifTrendigs: {
    width: 175,
    marginVertical: 4,
  },
});
