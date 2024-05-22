import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useFonts } from "expo-font";

const backButton = require("../../images/Back Button.png");

const Galeri = ({ navigation }) => {
  const [loaded] = useFonts({
    NunitoSans: require("../../../assets/fonts/NunitoSans.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backButton} style={styles.backButton} />
      </TouchableOpacity>
      <Text style={styles.text}>
        Lütfen Eserlerini Görüntülemek İstediğiniz Müzeyi Seçiniz
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Bandırma Arkeoloji Müzesi")}
        >
          <Text style={styles.buttonText}>Bandırma Arkeoloji Müzesi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("İstanbul Arkeoloji Müzesi")}
        >
          <Text style={styles.buttonText}>İstanbul Arkeoloji Müzesi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Şanlıurfa Arkeoloji Müzesi")}
        >
          <Text style={styles.buttonText}>Şanlıurfa Arkeoloji Müzesi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Bursa Kent Müzesi")}
        >
          <Text style={styles.buttonText}>Bursa Kent Müzesi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Topkapı Sarayı")}
        >
          <Text style={styles.buttonText}>Topkapı Sarayı</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: "60@s",
    marginStart: "20@s",
  },
  text: {
    fontFamily: "NunitoSans",
    fontSize: "22@s",
    textAlign: "center",
    marginTop: "30@s",
  },
  buttonContainer: {
    marginTop: "40@s",
  },
  button: {
    backgroundColor: "#218DF0",
    padding: "20@s",
    margin: "12@s",
    borderRadius: "16@s",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "NunitoSans",
    color: "white",
    fontSize: "16@s",
  },
});

export default Galeri;