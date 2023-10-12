import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import styles from "./CategoryDetail.style";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useGetGifsQuery,
} from "../../../../../services/gifsApi";
import * as FileSystem from "expo-file-system";

const CategoryDetail = ({ category }) => {
  const [successDownloadGif, setSuccessDownloadGif] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { data: dataGifs } = useGetGifsQuery();
  const { data: dataCategories } = useGetCategoriesQuery();
  const navigation = useNavigation();

  let dataFilterByCategory = [];
  if (dataGifs) {
    dataFilterByCategory = dataGifs.filter(
      (item) => item.category === category
    );
  }

  const handleAllGifsByTitle = (title) => {
    navigation.navigate("AllGifsTitle", {
      gifs: dataFilterByCategory,
      category,
      title,
    });
  };

  const generateRandomHeight = () => {
    return Math.floor(Math.random() * (220 - 100 + 1)) + 150;
  };

  const handleDownloadGif = async (imageUrl) => {
    setLoading(true);

    try {
      console.log(imageUrl);
      const downloadDir = FileSystem.documentDirectory + "downloads/gifApp";
      await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });

      const imageName = "your_image.jpg";

      const fileUri = downloadDir + imageName;
      const response = await FileSystem.downloadAsync(imageUrl, fileUri);

      if (response.status === 200) {
        console.log("Descarga exitosa");
        setSuccessDownloadGif(true);
        setModal(true);
      } else {
        console.error("Error al descargar");
      }
    } catch (error) {
      setSuccessDownloadGif(false);
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onPressDownload = (imageUrl) => {
    Alert.alert(
      "GifApp",
      "¿Quieres descargar este gif?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Descargar",
          onPress: () => handleDownloadGif(imageUrl),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => {
    const randomHeight = generateRandomHeight();

    return (
      <Pressable
        style={styles.gifTrending}
        onLongPress={() => onPressDownload(item)}
      >
        <View style={[styles.gif]}>
          <Image
            source={{ uri: item }}
            style={[
              styles.imageGifTrendigs,
              { height: randomHeight, margin: 5 },
            ]}
          />
        </View>
      </Pressable>
    );
  };

  dataFilterByCategory;

  const scrollY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  {
    loading && (
      <View style={{ flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      {category != "Tendencias" && (
        <Animated.View
          style={[
            styles.containerCategory,
            {
              backgroundColor: currentTheme.backgroundColor,
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [0, 150],
                    outputRange: [1, 0.5],
                    extrapolate: "clamp",
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [0, 200],
                outputRange: [1, 0],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <Image
            source={{
              uri: dataCategories.find((item) => item.title === category)
                ?.image,
            }}
            style={[
              styles.imageCategory,
              { backgroundColor: currentTheme.backgroundColor },
            ]}
          />
        </Animated.View>
      )}

      {dataFilterByCategory?.map(
        (item) =>
          category === "Tendencias" && (
            <View style={styles.trendingContainer} key={item.id}>
              <FlatList
                onScroll={handleScroll}
                scrollEventThrottle={1}
                style={styles.scrollContainer}
                data={item.gifs}
                numColumns={2}
                /* contentContainerStyle={
                  {
                    paddingHorizontal: 24,
                    alignSelf: "stretch",
                  }
                } */
                columnWrapperStyle={styles.wrapperStyle}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
            </View>
          )
      )}

      {successDownloadGif && (
        <Modal
          transparent={true}
          visible={modal}
          animationType="fade"
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Pressable
              style={{
                width: 250,
                height: 250,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                borderRadius: 24,
              }}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text>Descarga exitosa</Text>
            </Pressable>
          </View>
        </Modal>
      )}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        onScroll={handleScroll}
        scrollEventThrottle={1}
      >
        <View style={styles.gifsPrincipalContainer}>
          {dataFilterByCategory?.map((item) => (
            <View style={styles.containerGifsCharacter} key={item.id}>
              {category !== "Tendencias" && (
                <>
                  <View style={styles.headerListGifs}>
                    <Text
                      style={[styles.title, { color: currentTheme.textColor }]}
                    >
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleAllGifsByTitle(item.title)}
                    >
                      <Text
                        style={[
                          styles.label,
                          { color: currentTheme.textColor },
                        ]}
                      >{`Ver más`}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.gifsContainer, {}]}>
                    {item.gifs.slice(0, 3).map((gif, index) => (
                      <View style={styles.gif} key={index}>
                        <Image
                          source={{ uri: gif }}
                          style={styles.imageGif}
                          key={index}
                        />
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryDetail;
