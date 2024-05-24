import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import { useFavorites } from '../../context/FavoritesContext';

const backButton = require('../../images/Back Button.png');
const image_1 = require('../../images/es1.png');
const favButton = require('../../images/Fav Button.png');

const ContentDetail = ({ navigation }) => {
  const [loaded] = useFonts({
    NunitoSans: require("../../../assets/fonts/NunitoSans.ttf"),
    NunitoSansBold: require("../../../assets/fonts/NunitoSansBold.ttf"),
  });
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const snapshot = await get(ref(db, "BandirmaMuzesi/1"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Data fetched successfully:", data);
          setContent(data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleFavoritePress = () => {
    if (isFavorited) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {content && (
          <>
            <ImageBackground source={{ uri: content.uri }} style={styles.img}>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require("../../images/Back Button.png")}
                    style={styles.backButton}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleFavoritePress}>
                  <Image
                    source={require("../../images/Fav Button.png")}
                    style={styles.favButton}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{content.isim}</Text>
            </View>

            <View style={styles.subContainer}>
              <Text style={styles.aciklama}>{content.metin}</Text>
            </View>

            <View style={styles.subButtonsContainer}>
              <View style={styles.line}></View>
              <TouchableOpacity style={styles.subButtons}>
                <Ionicons name="play-circle" size={30} />
                <Text style={styles.buttonText}>İçeriği Dinle</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 400 }}></View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "500@s",
    alignSelf: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "50@s",
    marginHorizontal: "25@s",
  },
  backButton: {
    width: "30@s",
    height: "30@s",
  },
  favButton: {
    width: "30@s",
    height: "30@s",
  },
  titleContainer: {
    width: "300@s",
    height: "60@s",
    backgroundColor: "#FFFFFF",
    borderRadius: "12@s",
    alignSelf: "center",
    zIndex: 1,
    top: "-80@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: "NunitoSansBold",
    fontSize: "16@s",
    marginStart: "20@s",
    textAlignVertical: "center",
    lineHeight: "60@s",
  },
  subContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: "50@s",
    borderTopLeftRadius: "50@s",
    marginTop: "450@s",
    height: "100%",
  },
  aciklama: {
    fontFamily: "NunitoSans",
    fontSize: "12@s",
    color: "#666666",
    margin: "20@s",
    marginTop: "50@s",
  },
  subButtonsContainer: {
    position: "absolute",
    width: "100%",
    height: "100@s",
    marginTop: "740@s",
  },
  subButtons: {
    flexDirection: "row",
    margin: "20@s",
    alignItems: "center",
  },
  line: {
    width: "300@s",
    height: "1@s",
    alignSelf: "center",
    backgroundColor: "#E5E5E5",
  },
  buttonText: {
    marginStart: "10@s",
    fontFamily: "NunitoSans",
    fontSize: "14@s",
  },
});

export default ContentDetail;