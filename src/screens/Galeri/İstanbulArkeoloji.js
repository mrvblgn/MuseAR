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
      name: "Büyük İskender Büstü",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fbuuyk_iskender.jpg?alt=media&token=b47d23d4-1f86-49f3-aa4f-dc9ee726a671",
      },
    },
    {
      id: 2,
      name: "Sappho Büstü",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fsappho_bustu.jpg?alt=media&token=adb0a2f5-ebc1-4730-a85a-03db7ad972a3",
      },
    },
    {
      id: 3,
      name: "Aşk Şiiri Tableti",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fask_siiri.jpg?alt=media&token=5145ffd7-1305-4307-9e99-e83e880e2617",
      },
    },
    {
      id: 4,
      name: "Kadeş Barış Antlaşması",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fkades_antlasmasi.jpg?alt=media&token=433916de-89c4-4f5f-ac82-a70f443def48",
      },
    },
    {
      id: 5,
      name: "İskender Lahdi",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fiskender_lahdi.jpg?alt=media&token=fa4cb6a9-76cb-4330-a9c8-ad6f9c14f231",
      },
    },
    {
      id: 6,
      name: "Likya Lahdi",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Flikyalahdi.jpg?alt=media&token=42f0c4fe-e2ee-40e1-b254-9e899f88b8ea",
      },
    },
    {
      id: 7,
      name: "Marsyas Heykeli",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fmarsyas_heykel.jpg?alt=media&token=0f0a16e8-dbcf-4b40-a6f1-2bbb3652c2fe",
      },
    },
    {
      id: 8,
      name: "Artemis Heykel",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fartemis_heykel.jpg?alt=media&token=5df3b842-4482-475e-9127-d804e68a73de",
      },
    },
    {
      id: 9,
      name: "Sidamara Lahdi",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Fsidamara_lahdi.jpg?alt=media&token=a60c59bb-1dd7-4972-9e03-83dbcbf49b7d",
      },
    },
    {
      id: 10,
      name: "Ağlayan Kadınlar ",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/%C4%B0stanbulArkeoloji%2Faglayan_kadinlar.jpg?alt=media&token=e37c913b-da8c-4e00-8ab9-9509d3dac39b",
      },
    },
  ];
  
  const MuzeIstArk = ({ navigation, route }) => {
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
  
  export default MuzeIstArk;