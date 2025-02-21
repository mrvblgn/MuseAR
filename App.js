import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScaledSheet } from "react-native-size-matters";
import { FavoritesProvider } from "./src/context/FavoritesContext";

// screens
import SplashScreen from "./src/screens/SplashScreen";
import LocationScreen from "./src/screens/LocationScreen";
import ARCamera from "./src/screens/ARCamera";
import Profile from "./src/screens/Profile";
import GalleryStack from "./src/GalleryStack";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Muze1 from "./src/screens/Galeri/BandirmaMuze";
import MuzeIstArk from "./src/screens/Galeri/İstanbulArkeoloji";
import MuzeSanArk from "./src/screens/Galeri/SanliurfaArkeoloji";
import MuzeTopk from "./src/screens/Galeri/TopkapiSarayi";
import Muzebur from "./src/screens/Galeri/BursaKent";
import ContentDetail from "./src/screens/Galeri/ContentDetail";
import Cdetailist from "./src/screens/Galeri/Cdetailist";
import Cdetailsan from "./src/screens/Galeri/Cdetailsan";
import Cdetailtopk from "./src/screens/Galeri/Cdetailtopk";
import Cdetailbur from "./src/screens/Galeri/Cdetailbur";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
        },
        tabBarActiveTintColor: "#218DF0",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Galeri") {
            iconName = focused ? "images" : "images-outline";
          } else if (route.name === "AR Kamera") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Galeri" component={GalleryStack} />
      <Tab.Screen name="AR Kamera" component={ARCamera} />
      <Tab.Screen name="Profil" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: "none" }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Muze1" component={Muze1} />
          <Stack.Screen name="MuzeIstArk" component={MuzeIstArk} />
          <Stack.Screen name="MuzeSanArk" component={MuzeSanArk} />
          <Stack.Screen name="MuzeSanTopk" component={MuzeTopk} />
          <Stack.Screen name="Muzebur" component={Muzebur} />
          <Stack.Screen name="ContentDetail" component={ContentDetail} />
          <Stack.Screen name="Cdetailist" component={Cdetailist} />
          <Stack.Screen name="Cdetailsan" component={Cdetailsan} />
          <Stack.Screen name="Cdetailtopk" component={Cdetailtopk} />
          <Stack.Screen name="Cdetailbur" component={Cdetailbur} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = ScaledSheet.create({
  tabBarStyle: {
    borderTopWidth: 0,
    borderTopLeftRadius: "25@s",
    borderTopRightRadius: "25@s",
    position: "absolute",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
