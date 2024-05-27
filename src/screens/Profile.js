import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { ref, onValue, remove } from "firebase/database";
import { db } from "./firebaseConfig"; // Firebase configuration
import { ScaledSheet } from "react-native-size-matters";
import { useFonts } from "expo-font";

const Profile = () => {
  const [favoriteContent, setFavoriteContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});

  const [loaded] = useFonts({
    NunitoSans: require("../../assets/fonts/NunitoSans.ttf"),
    NunitoSansBold: require("../../assets/fonts/NunitoSansBold.ttf"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritesRef = ref(db, "favorites");
        onValue(favoritesRef, (snapshot) => {
          const favoritesData = snapshot.val();
          const favoritesArray = favoritesData
            ? Object.entries(favoritesData).map(([key, value]) => ({
                key,
                ...value,
              }))
            : [];
          setFavoriteContent(favoritesArray);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching favorites: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (key) => {
    try {
      await remove(ref(db, `favorites/${key}`));
      setFavoriteContent((prevFavorites) =>
        prevFavorites.filter((item) => item.key !== key)
      );
    } catch (error) {
      console.error("Error deleting favorite: ", error);
    }
  };

  const toggleExpand = (key) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderDescription = (description, isExpanded) => {
    const characterLimit = 200;
    if (isExpanded) {
      return description;
    }
    return description.length > characterLimit
      ? `${description.substring(0, characterLimit)}...`
      : description;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Beğenilenler</Text>
      <FlatList
        data={favoriteContent}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.isim}</Text>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemDescription}>
                {renderDescription(item.metin, expandedItems[item.key])}
                {item.metin.length > 200 && (
                  <TouchableOpacity
                    onPress={() => toggleExpand(item.key)}
                  >
                    <Text style={styles.expandButtonText}>
                      {expandedItems[item.key] ? "Daha az" : "Daha fazla"}
                    </Text>
                  </TouchableOpacity>
                )}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.key)}
            >
              <Text style={styles.deleteButtonText}>Kaldır</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    padding: "16@s",
  },
  expandButtonText: {
    color: "#218DF0",
    textDecorationLine: "underline",
    fontFamily: "NunitoSans",
    marginLeft: "4@s",
    fontSize: "14@s"
  },
  title: {
    fontSize: "24@s",
    marginTop: "50@s",
    marginBottom: "16@s",
    fontFamily: "NunitoSansBold",
  },
  itemContainer: {
    marginBottom: "16@s",
    padding: "10@s",
    backgroundColor: "#FFFFFF",
    borderRadius: "12@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "200@s",
    borderRadius: "10@s",
    marginBottom: "10@s",
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: "18@s",
    fontFamily: "NunitoSansBold",
    marginBottom: "8@s",
  },
  itemDescription: {
    fontSize: "14@s",
    color: "#666",
    fontFamily: "NunitoSans",
  },
  deleteButton: {
    backgroundColor: "#218DF0",
    paddingVertical: "8@s",
    paddingHorizontal: "16@s",
    borderRadius: "8@s",
    alignItems: "center",
    marginTop: "10@s",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: "14@s",
    fontFamily: "NunitoSansBold",
  },
  contentContainer: {
    paddingBottom: "50@s",
  },
});

export default Profile;
