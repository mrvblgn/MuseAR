import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const backButton = require("../../images/Back Button.png");

export const eserler = [
  {
    id: 1,
    name: "İpek Kozası",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BursaKent%2Fkoza.jpeg?alt=media&token=4b559deb-bb6e-4bab-acb0-ae1e95e9fbb0",
    },
  },
  {
    id: 2,
    name: "Çarşılı Köprü Irgandı",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BursaKent%2Firgandi.jpeg?alt=media&token=7a9bc8ff-8519-4703-94ee-5274eb8f276b",
    },
  },
  {
    id: 3,
    name: "Kılıç",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BursaKent%2Fkilic.jpeg?alt=media&token=81dc7e63-a12d-4155-ad0e-1a255c80f22a",
    },
  },
  {
    id: 4,
    name: "Altın",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BursaKent%2Faltin.jpeg?alt=media&token=771a5028-d295-4d74-a1ec-12cddfb63e38",
    },
  },
  {
    id: 5,
    name: "Zeki Müren Piyanosu",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BursaKent%2Fpiyano.jpeg?alt=media&token=b358d2e3-3eab-4a3a-96ab-0fb3d64c8144",
    },
  },
  {
    id: 6,
    name: "Bıçak",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BursaKent%2Fbicak.jpeg?alt=media&token=f320289f-fa12-41bb-acff-f7a12d482fb4",
    },
  },
];

const Muzebur = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded] = useFonts({
    NunitoSans: require("../../../assets/fonts/NunitoSans.ttf"),
    NunitoSansBold: require("../../../assets/fonts/NunitoSansBold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const filteredEserler = eserler.filter((eser) =>
    eser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.start}
      onPress={() => navigation.navigate("Cdetailbur", { id: item.id })}
    >
      <ImageBackground source={item.source} style={styles.img}>
        <View style={styles.textContainer}>
          <Text style={styles.imgText}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backButton} style={styles.backButton} />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Eser Ara"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <Ionicons name="search" size={25} color="#CACACA" style={styles.icon} />
      </View>

      <FlatList
        data={filteredEserler}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />

      <View style={{ height: 100 }}></View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: "26@s",
    height: "26@s",
    marginTop: "50@s",
    marginStart: "20@s",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "90@s",
    left: "40@s",
  },
  input: {
    backgroundColor: "#FAFAFA",
    width: "315@s",
    height: "40@s",
    borderRadius: "16@s",
    marginTop: "15@s",
    fontSize: "16@s",
    paddingLeft: "25@s",
    fontFamily: "NunitoSans",
  },
  text: {
    fontFamily: "NunitoSansBold",
    fontSize: "16@s",
    marginTop: "50@s",
    marginStart: "25@s",
  },
  start: {
    marginStart: "17@s",
  },
  img: {
    width: "150@s",
    height: "170@s",
    marginTop: "20@s",
    borderRadius: "16@s",
    overflow: "hidden",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "rgba(46, 46, 46, 0.71)",
    width: "126@s",
    height: "40@s",
    marginTop: "120@s",
    borderRadius: "7@s",
    justifyContent: "center",
  },
  imgText: {
    color: "white",
    fontFamily: "NunitoSansBold",
    textAlign: "center",
  },
});

export default Muzebur;
