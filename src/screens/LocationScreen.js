import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScaledSheet } from "react-native-size-matters"
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';


const BANDIRMA_MUZE = { latitude: 40.34832683118081, longitude: 27.953982548615926 };
const ISTANBUL_ARKEOLOJI = { latitude: 41.01187973898854, longitude: 28.981384151673197 };
const SANLIURFA_ARKEOLOJI = { latitude: 37.15444421626663, longitude: 38.78125854788157 };
const BURSA_KENT_MUZESI = { latitude: 40.18258056204574, longitude: 29.066452865120397 };
const TOPKAPI_SARAYI = { latitude: 41.01173802745058, longitude: 28.98340036591475 };
const EV = { latitude: 40.183070684319965, longitude: 29.059139847307623 };
const EK_BINA = { latitude: 39.54221229955762, longitude: 28.00791148721264 };

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

    const distanceToBandirma = getDistance(userCoordinates.latitude, userCoordinates.longitude, BANDIRMA_MUZE.latitude, BANDIRMA_MUZE.longitude);
    const distanceToIstanbul = getDistance(userCoordinates.latitude, userCoordinates.longitude, ISTANBUL_ARKEOLOJI.latitude, ISTANBUL_ARKEOLOJI.longitude);
    const distanceToSanliurfa = getDistance(userCoordinates.latitude, userCoordinates.longitude, SANLIURFA_ARKEOLOJI.latitude, SANLIURFA_ARKEOLOJI.longitude);
    const distanceToBursa = getDistance(userCoordinates.latitude, userCoordinates.longitude, BURSA_KENT_MUZESI.latitude, BURSA_KENT_MUZESI.longitude);
    const distanceToTopkapi = getDistance(userCoordinates.latitude, userCoordinates.longitude, TOPKAPI_SARAYI.latitude, TOPKAPI_SARAYI.longitude);
    const distanceToEv = getDistance(userCoordinates.latitude, userCoordinates.longitude, EV.latitude, EV.longitude);
    const distanceToEkbina = getDistance(userCoordinates.latitude, userCoordinates.longitude, EK_BINA.latitude, EK_BINA.longitude);

    if (distanceToBandirma < 0.1) { // if less than 100 meters
      setLocationName("Bandırma Arkeoloji Müzesi'nde Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToIstanbul < 0.1) {
      setLocationName("İstanbul Arkeoloji Müzesi'nde Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToSanliurfa < 0.1) {
      setLocationName("Şanlıurfa Arkeoloji Müzesi'nde Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToBursa < 0.1) {
      setLocationName("Bursa Kent Müzesi'nde Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToTopkapi < 0.1) {
      setLocationName("Topkapı Sarayı Müzesi'nde Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToEv < 0.1) {
      setLocationName("Ev'de Gözüküyorsunuz.\nDoğru mu ?");
    } else if (distanceToEkbina < 0.1) {
      setLocationName("Mühendislik Fakültesi Ek Bina'da Gözüküyorsunuz.\nDoğru mu ?");
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
    return (
      <>
        <Text style={styles.konumText}>Konum Bilgisi Alınıyor</Text>
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading}/>
      </>
    )
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
  },
  konumText: {
    fontFamily: 'NunitoSans',
    marginTop: '330@s',
    fontSize: '25@s',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  loading: {
    marginTop: '30@s',
  }
})

export default LocationScreen