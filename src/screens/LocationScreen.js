import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScaledSheet } from "react-native-size-matters"
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';


const BALIKESIR_MUZE = { latitude: 39.645974613481954, longitude: 27.87982377800246 };
const BURSA_ULU_CAMI = { latitude: 40.18410534034755, longitude: 29.061900895635265 };
const BURSA_KENT_MUZESI = { latitude: 40.18258056204574, longitude: 29.066452865120397 };
const EV = { latitude: 40.183070684319965, longitude: 29.059139847307623}

const getDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

const LocationScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState(null);
  const [locationName, setLocationName] = useState('');

  const [loaded] = useFonts({
    NunitoSans: require('../../assets/fonts/NunitoSans.ttf'),
  });
  if (!loaded) {
      return null;
  }

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    const userCoordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const distanceToMuseum = getDistance(userCoordinates.latitude, userCoordinates.longitude, BALIKESIR_MUZE.latitude, BALIKESIR_MUZE.longitude);
    const distanceToCami = getDistance(userCoordinates.latitude, userCoordinates.longitude, BURSA_ULU_CAMI.latitude, BURSA_ULU_CAMI.longitude);
    const distanceToMuzesi = getDistance(userCoordinates.latitude, userCoordinates.longitude, BURSA_KENT_MUZESI.latitude, BURSA_KENT_MUZESI.longitude);
    const distanceToEv = getDistance(userCoordinates.latitude, userCoordinates.longitude, EV.latitude, EV.longitude);

    if (distanceToMuseum < 0.1) { // if less than 100 meters
      setLocationName("Balıkesir Kuva-yi Milliye Müzesi'nde Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToCami < 0.1) {
      setLocationName("Bursa Ulu Camii'de Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToMuzesi < 0.1) {
      setLocationName("Bursa Kent Müzesi'nde Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToEv < 0.1) {
      setLocationName("Ev'de Gözüküyorsunuz.\nDoğru mu ?");
    } else {
      setLocationName("sistemimize kayıtlı bir müze yakınında değilsiniz.");
      navigation.navigate('TabNavigator', { screen: 'GalleryStack' });
    }

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
    setLoading(false);
  }

  useEffect(() => {
    userLocation();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
      >
        <Marker
          coordinate={mapRegion}
          title="My Location"
          description="I am here"
        />
      </MapView>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Şu anda {locationName}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => navigation.navigate('TabNavigator', { screen: 'AR Kamera' })}>
            <Ionicons name="checkmark-circle-outline" size={50} color={'#218DF0'}/>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity onPress={() => navigation.navigate('TabNavigator', { screen: 'GalleryStack' })}>
            <Ionicons name="close-circle-outline" size={50} color={'#218DF0'}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '85%',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '25@s',
    borderTopRightRadius: '25@s',
    backgroundColor: '#FAFAFA',
    height: '30%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontFamily: 'NunitoSans',
    fontSize: '18@s',
    textAlign: 'center',
    margin: '10@s',
  },
  space: {
    width: '50@s'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10@s',
  }
})

export default LocationScreen