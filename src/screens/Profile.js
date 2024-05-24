import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Profile;
