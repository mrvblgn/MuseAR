import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { ScaledSheet } from "react-native-size-matters";

const Profile = () => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beğenilenler</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: "20@s",
    fontWeight: "bold",
    marginTop: "100@s",
  },
});

export default Profile;
