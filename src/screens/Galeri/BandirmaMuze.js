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
    name: "Adak Steli",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fadak_steli.jpg?alt=media&token=c0132c4f-cbc5-4543-9443-f789432dd1cf",
    },
  },
  {
    id: 2,
    name: "Amfora",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Famfora.jpeg?alt=media&token=3e47ddfb-7913-45aa-8c45-f80d10c19404",
    },
  },
  {
    id: 3,
    name: "Gümüş Elham Kutusu",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fgumus_elham_kutusu.jpeg?alt=media&token=947053bd-09ad-4fd4-a305-3a16a9b1881a",
    },
  },
  {
    id: 4,
    name: "Bizans Dönemi Bronz Diptikon",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fbronz_diptikon.jpeg?alt=media&token=a7626cf1-6f9b-415f-8fe1-c6cf102183e5",
    },
  },
  {
    id: 5,
    name: "Denizci Steli",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fdenizci_steli.jpg?alt=media&token=b8dd38c7-164b-40f1-9145-23105d13e064",
    },
  },
  {
    id: 6,
    name: "Mezar Steli",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fmezar_steli.jpg?alt=media&token=acc4bdd7-15ff-432a-b69b-9be6dd5dfec6",
    },
  },
  {
    id: 7,
    name: "Karyatid",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fkaryatid.jpg?alt=media&token=802fc1a7-ea7d-4a49-b0b5-060f7cc72d88",
    },
  },
  {
    id: 8,
    name: "Yüksek Kabartma Mezar Steli",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fyuksek_kabartma_mezar_steli.jpg?alt=media&token=23b7646e-0d2b-47b0-9fec-155cb1c106e1",
    },
  },
  {
    id: 9,
    name: "Akroter",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fakroter.jpeg?alt=media&token=8cbd12cc-7ce1-4fc8-856d-2405e327d8ec",
    },
  },
  {
    id: 10,
    name: "Sedef Kemer Tokası Parçası",
    source: {
      uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/BandirmaArkeoloji%2Fsedef_toka.jpeg?alt=media&token=edc9ed02-6f52-480f-a3ac-2da81f6fce87",
    },
  },
];

const Muze1 = ({ navigation }) => {
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
      onPress={() => navigation.navigate("ContentDetail", { id: item.id })}
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
    width: "30@s",
    height: "30@s",
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

export default Muze1;
