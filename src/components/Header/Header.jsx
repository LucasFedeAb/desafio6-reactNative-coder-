import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Header.style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../features/themeSlice/themeSlice";
import { clearUser } from "../../features/authSlice/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import { colorGreen } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";

const Header = ({ title }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarActive(true);
  };

  const closeSidebar = () => {
    setSidebarActive(false);
  };

  const toggleTheme = () => {
    dispatch(setTheme());
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    //<LinearGradient colors={[`#698e71`, `#698e71`, `#000`]} style={styles.nav}>
    <>
      <StatusBar
        animated={true}
        style="light"
        backgroundColor={sidebarActive ? "#26423a" : "#396156"}
      />
      <LinearGradient
        colors={[
          `#26423a`,
          `#27483f`,
          `#3c675a`,
          `#3c675a`,
          `#396156`,
          `#304b44`,
          `#2c3e37`,
        ]}
        style={styles.nav}
      >
        <View style={styles.navBar}>
          {title === "Home" ? (
            <>
              <TouchableOpacity
                style={styles.sidebarIcon}
                onPress={toggleSidebar}
              >
                <Ionicons name="menu-sharp" size={30} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.logo}>{title}</Text>
              <TouchableOpacity style={styles.endIcon}>
                <Ionicons name="notifications" size={25} color="#FFF" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.endIcon}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={35} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.titleDetail}>{title}</Text>

              <View />
            </>
          )}
        </View>

        {sidebarActive && (
          <LinearGradient
            colors={[
              `#26423a`,
              `#27483f`,
              `#3c675a`,
              `#3c675a`,
              `#396156`,
              `#304b44`,
              `#2c3e37`,
            ]}
            style={styles.sidebar}
          >
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarLogo}>My app</Text>
              <TouchableOpacity
                style={styles.sidebarCloseIcon}
                onPress={closeSidebar}
              >
                <Ionicons name="close" size={30} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.sidebarNavLinks}>
              <TouchableOpacity style={styles.sidebarNavLink}>
                <Ionicons name="person-outline" size={22} color="#FFF" />
                <Text style={styles.sidebarNavLinkText}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarNavLink}>
                <Ionicons name="settings-outline" size={22} color="#FFF" />
                <Text style={styles.sidebarNavLinkText}>Configuración</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarNavLink}>
                <Ionicons name="document-text-outline" size={22} color="#FFF" />
                <Text style={styles.sidebarNavLinkText}>
                  Términos y condiciones
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarNavLink}>
                <Ionicons name="cog-outline" size={22} color="#FFF" />
                <Text style={styles.sidebarNavLinkText}>Servicios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarNavLink}>
                <Ionicons name="mail-outline" size={22} color="#FFF" />
                <Text style={styles.sidebarNavLinkText}>Contacto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sidebarNavLink}
                onPress={toggleTheme}
              >
                {isDarkMode ? (
                  <>
                    <Ionicons name="sunny" size={24} color="yellow" />
                    <Text style={styles.sidebarNavLinkText}>Modo Claro</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="moon" size={24} color="#777" />
                    <Text style={styles.sidebarNavLinkText}>Modo Oscuro</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sidebarNavLink, { marginTop: 180 }]}
                onPress={handleLogout}
              >
                <Ionicons name="exit-outline" size={28} color="#fff" />
                <Text style={styles.sidebarNavLinkText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      </LinearGradient>
    </>
  );
};

export default Header;
