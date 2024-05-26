import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { ref, onValue, remove } from "firebase/database";
import { db } from "./firebaseConfig"; // Firebase configuration
import { ScaledSheet } from "react-native-size-matters";

const Profile = () => {
  const [favoriteContent, setFavoriteContent] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beğenilenler</Text>
      <FlatList
        data={favoriteContent}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.isim}</Text>
              <Text style={styles.itemDescription}>{item.metin}</Text>
            </View>
            <Button
              title="Kaldır"
              onPress={() => handleDelete(item.key)}
              style={styles.deleteButton}
            />
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
  container: {
    flex: 1,
    padding: "16@s",
  },
  title: {
    fontSize: "24@s",
    marginVertical: "16@s",
  },
  itemContainer: {
    marginBottom: "16@s",
    position: "relative",
  },
  image: {
    width: "100@s",
    height: "100@s",
    marginBottom: "8@s",
  },
  textContainer: {
    marginBottom: "8@s",
  },
  itemTitle: {
    fontSize: "18@s",
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: "14@s",
    color: "#666",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default Profile;