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
      name: "Kaşıkçı Elması",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fkasikci_elmas.jpeg?alt=media&token=d71f523b-61d1-4c6f-a981-33de71dd23e4",
      },
    },
    {
      id: 2,
      name: "Topkapı Hançeri",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Ftopkapi_hancer.jpg?alt=media&token=680d595e-5121-4e8a-bc01-fca868399ff2",
      },
    },
    {
      id: 3,
      name: "Bakır Eşyalar",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fbakir_esyalar.PNG?alt=media&token=f797bdb2-c588-40be-8551-dbd93e89559b",
      },
    },
    {
      id: 4,
      name: "Yıldız Porselenleri",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fyildiz_porselen.PNG?alt=media&token=c0e2b766-4147-42b7-b474-d9aa515b27ee",
      },
    },
    {
      id: 5,
      name: "Nakş-ı Kadem-i",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fkademi_serif.jpg?alt=media&token=f2887ad5-16da-4dc0-b753-8bdaf24d75a7",
      },
    },
    {
      id: 6,
      name: "Su Takımı",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fsu_takimi.PNG?alt=media&token=b5a8f46d-5c8f-4423-a45a-4aaa76302761",
      },
    },
    {
      id: 7,
      name: "Harem Mescidi",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fharem_mescidi.jpg?alt=media&token=886f851a-4f89-4d69-a7f2-8b38310b2f02",
      },
    },
    {
      id: 8,
      name: "Lale Süslemeli Çeşme",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Flale_cesme.jpeg?alt=media&token=4d4ab5a9-0bf5-4c53-b61e-fe4e64c262bc",
      },
    },
    {
      id: 9,
      name: "Padişah Kaftan",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fpadisah_kaftan.PNG?alt=media&token=8458b5ba-f3bc-4c67-9649-00be725bebcc",
      },
    },
    {
      id: 10,
      name: "Sultan III. Mustafa’nın Törensel Zırh Takımı",
      source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/muze-ca804.appspot.com/o/TopkapiSarayi%2Fsultan_IIImustafa_zirh.jpg?alt=media&token=f2e6314c-2d4c-49b7-90c3-8acbff309c60",
      },
    },
  ];
  
  const MuzeTopk = ({ navigation, route }) => {
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
  
  export default MuzeTopk;