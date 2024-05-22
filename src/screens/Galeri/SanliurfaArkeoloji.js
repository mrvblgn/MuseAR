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
      name: "Balıklıgöl Heykeli",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Fbalikligol_heykel.jpg?alt=media&token=73aceba0-75e6-4e98-98fd-f9fabbf3b863",
      },
    },
    {
      id: 2,
      name: "Yılanlı Kafa",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Fyilanlikafa.jpg?alt=media&token=dd4fb563-36be-43c8-9482-40c0821efa7a",
      },
    },
    {
      id: 3,
      name: "Eros ve Psykhe Kabartması",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Ferosvepsykhe.jpg?alt=media&token=61595df6-213d-43de-afa8-306c2a121d7f",
      },
    },
    {
      id: 4,
      name: "Nevari Çori Buluntuları",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Fnevari_cori_buluntulari.jpg?alt=media&token=fe7da2bd-d733-488f-8be6-87357c865955",
      },
    },
    {
      id: 5,
      name: "Zafer Tanrıçası Nike",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Fzafertanricasinike.jpeg?alt=media&token=676bfebb-7a64-44d3-a0b6-ce841820d4f3",
      },
    },
    {
      id: 6,
      name: "Göbeklitepe Totem Dikmesi",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Fgobeklitepe_totem_dikmesi.jpg?alt=media&token=9507d2f6-db92-468b-8b8b-7accbceee565",
      },
    },
    {
      id: 7,
      name: "Göz İdolleri",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Fgoz_idol.jpg?alt=media&token=dd4204eb-0972-493f-b95a-118c875f73d4",
      },
    },
    {
      id: 8,
      name: "Orpheus Mozaiği",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Forpheus_mozaik.jpg?alt=media&token=7acad678-6cc3-4e8d-b032-72dd76443a02",
      },
    },
    {
      id: 9,
      name: "Taş Kase Parçası",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Ftas_kase_parcasi.jpg?alt=media&token=416ed158-ce69-4cdb-9247-9d7c266e8252",
      },
    },
    {
      id: 10,
      name: "Hayvan Kabartmaları ",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/SanliurfaArkeoloji%2Fhayvankabartmalari.PNG?alt=media&token=b23c8ac6-f007-4ada-a05c-c601d7ec0060",
      },
    },
  ];
  
  const MuzeSanArk = ({ navigation, route }) => {
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
        onPress={() => navigation.navigate("Content Detail")}
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
  
  export default MuzeSanArk;