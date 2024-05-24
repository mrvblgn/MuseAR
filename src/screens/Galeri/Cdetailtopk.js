import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { get, ref } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebaseConfig";

const Cdetailtopk = ({ navigation, route }) => {
  const { id } = route.params;
  const [loaded] = useFonts({
    NunitoSans: require("../../../assets/fonts/NunitoSans.ttf"),
    NunitoSansBold: require("../../../assets/fonts/NunitoSansBold.ttf"),
  });
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for id:", id);
      try {
        const snapshot = await get(ref(db, `TopkapiSarayi/${id}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Data fetched successfully:", data);

          const storage = getStorage();
          const audioRef = storageRef(storage, data.audioPath);
          const audioUrl = await getDownloadURL(audioRef); // Get download URL directly
          data.audioUri = audioUrl;

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

    return () => {
      if (sound) {
        console.log("Unloading sound");
        sound.unloadAsync();
      }
    };
  }, [id]);

  const playSound = async () => {
    if (sound) {
      console.log("Playing sound");
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      console.log("Loading sound");
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: content.audioUri },
        { shouldPlay: true }
      );
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setSound(newSound);
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    try {
      if (sound) {
        console.log("Pausing sound");
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error pausing sound: ", error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
        if (sound) {
          sound
            .unloadAsync()
            .then(() => {
              setSound(null);
            })
            .catch((error) => {
              console.error("Error unloading sound: ", error);
            });
        }
      }
    }
  };

  const seekSound = async (value) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition);
      setPosition(seekPosition);
    }
  };

  if (loading || !loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log("Rendered content:", content);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
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

                  <TouchableOpacity>
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
                <View style={styles.subButtonsContainer}>
                  <TouchableOpacity
                    style={styles.subButtons}
                    onPress={isPlaying ? pauseSound : playSound}
                  >
                    <Ionicons
                      name={isPlaying ? "pause-circle" : "play-circle"}
                      size={30}
                      color={"#000"}
                    />
                      <Text style={styles.buttonText}>İçeriği Dinle</Text>
                  </TouchableOpacity>
                  <View style={styles.line}></View>
                </View>
              </View>
              <View style={{ height: 50 }}></View>
            </>
          )}
        </View>
      </ScrollView>
      {sound && (
        <View style={styles.miniPlayer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={position / duration}
            onValueChange={seekSound}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
          />
          <View style={styles.miniPlayerControls}>
            <TouchableOpacity
              onPress={() =>
                seekSound(Math.max((position - 15000) / duration, 0))
              }
            >
              <Ionicons name="play-skip-back" size={24} />
            </TouchableOpacity>
            {isPlaying ? (
              <TouchableOpacity onPress={pauseSound}>
                <Ionicons name="pause" size={24} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={playSound}>
                <Ionicons name="play" size={24} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                seekSound(Math.min((position + 15000) / duration, 1))
              }
            >
              <Ionicons name="play-skip-forward" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    paddingBottom: 100, // Enough space for the mini player
  },
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
    top: "-30@s",
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
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: "50@s",
    borderTopLeftRadius: "50@s",
    marginTop: "-50@s",
    paddingBottom: "20@s",
  },
  aciklama: {
    fontFamily: "NunitoSans",
    fontSize: "12@s",
    color: "#666666",
    margin: "20@s",
  },
  subButtonsContainer: {
    marginTop: "20@s",
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
  miniPlayer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20@s",
    backgroundColor: "#FFFFFF",
    borderRadius: "10@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  miniPlayerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    marginTop: "10@s",
  },
  slider: {
    width: "80%",
    height: "40@s",
  },
});

export default Cdetailtopk;
