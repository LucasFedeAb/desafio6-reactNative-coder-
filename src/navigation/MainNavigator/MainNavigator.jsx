import React, { useState, useEffect } from "react";
import AuthStackNavigator from "../AuthStackNavigator/AuthStackNavigator";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfileImageQuery } from "../../services/permissionsApi";
import { setCameraImage } from "../../features/authSlice/authSlice";

const MainNavigator = () => {
  const { user, localId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProfileImageQuery(localId);

  useEffect(() => {
    if (data) {
      dispatch(setCameraImage(data.image));
    }
  }, [data]);

  return user ? <BottomTabNavigator /> : <AuthStackNavigator />;
  /* return user ? <BottomTabNavigator /> : <BottomTabNavigator />; */
};

export default MainNavigator;
