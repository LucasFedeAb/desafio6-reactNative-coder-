import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./SearchScreen.style";
import SearchInput from "@components/SearchInput/SearchInput";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCategoriesQuery } from "../../services/gifsApi";

const SearchScreen = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { data, isLoading } = useGetCategoriesQuery();

  const renderItem = ({ item, index }) => {
    const backgroundColors = [
      "#016450",
      "#7358ff",
      "#1e3264",
      "#e8125c",
      "#e1118b",
      "#158a08",
      "#509bf6",
      "#e9142a",
    ];

    const backgroundColor = backgroundColors[index % backgroundColors.length];

    return (
      <TouchableOpacity
        style={[styles.categoryItem, { backgroundColor }]}
        key={item.title}
        onPress={() => handleCategory(item.title)}
      >
        <Text style={styles.titleCategory}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        <View>
          <View style={styles.boxTitle}>
            <Text style={[styles.title, { color: currentTheme.color }]}>
              Buscar
            </Text>
          </View>
          <SearchInput />

          <Text style={[styles.subTitle, { color: currentTheme.color }]}>
            Explorar
          </Text>
        </View>
        {isLoading ? (
          <Text>Loading data ...</Text>
        ) : (
          <FlatList
            data={data}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => renderItem({ item, index })}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;
