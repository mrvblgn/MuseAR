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
    padding: '16@s',
  },
  title: {
    fontSize: '24@s',
    marginBottom: '16@s',
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