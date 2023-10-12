import { ProfileScreen } from "../../screens";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      {/* <ProfileStack.Screen name="Location" component={Location} /> */}
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
