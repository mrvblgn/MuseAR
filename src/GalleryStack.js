import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScaledSheet } from "react-native-size-matters";
import { useFonts } from "expo-font";
import Galeri from "../src/screens/Galeri/index";
import Muze1 from "../src/screens/Galeri/BandirmaMuze";
import MuzeIstArk from "./screens/Galeri/İstanbulArkeoloji";
import MuzeSanArk from "./screens/Galeri/SanliurfaArkeoloji";
import MuzeTopk from "./screens/Galeri/TopkapiSarayi";
import ContentDetail from "./screens/Galeri/ContentDetail";
import Cdetailist from "./screens/Galeri/Cdetailist";
import Cdetailsan from "./screens/Galeri/Cdetailsan";
import Cdetailtopk from "./screens/Galeri/Cdetailtopk";
import Player from "./components/Player";

const Stack = createNativeStackNavigator();

const GalleryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Galeri"
        component={Galeri}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Bandırma Arkeoloji Müzesi"
        component={Muze1}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="İstanbul Arkeoloji Müzesi"
        component={MuzeIstArk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Topkapı Sarayı"
        component={MuzeTopk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Şanlıurfa Arkeoloji Müzesi"
        component={MuzeSanArk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content Detail"
        component={ContentDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content Detailist"
        component={Cdetailist}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content Detailsan"
        component={Cdetailsan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content Detailtopk"
        component={Cdetailtopk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default GalleryStack;
