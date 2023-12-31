import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./Home.style";
import Header from "@components/Header/Header";
import HomeTopTabNavigator from "@navigation/HomeStackNavigator/HomeTopTabNavigator/HomeTopTabNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../services/gifsApi";
import { setUniqueCategories } from "../../features/gifsSlice/gifsSlice";

const Home = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { data, isLoading } = useGetCategoriesQuery();

  const dispatch = useDispatch();

  const uniqueCategories = [];

  if (data) {
    for (const item of data) {
      if (!uniqueCategories.includes(item.title)) {
        uniqueCategories.push(item.title);
      }
    }
  }

  dispatch(setUniqueCategories(uniqueCategories));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      <Header title={"Home"} />
      {isLoading ? <Text>Loading...</Text> : <HomeTopTabNavigator />}
    </View>
  );
};

export default Home;
