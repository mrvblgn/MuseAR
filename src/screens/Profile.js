import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
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
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.itemTitle}>{item.isim}</Text>
            <Text style={styles.itemDescription}>{item.metin}</Text>
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
    fontSize: '24@s',
    margin: '16@s',
    marginTop: '50@s',
  },
  itemContainer: {
    marginBottom: '16@s',
  },
  image: {
    width: '100@s',
    height: '100@s',
  },
  itemTitle: {
    fontSize: '18@s',
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: '14@s',
    color: '#666',
  },
});

export default Profile;