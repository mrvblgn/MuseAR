import { Text, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScaledSheet } from "react-native-size-matters"
import { useFonts } from 'expo-font';

const image = require('../images/splash.png')

const SplashScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('AuthStack');
            setIsLoading(false);
        }, 3000); 

        return () => clearTimeout(timer); 
    }, []);

    const [loaded] = useFonts({
        NunitoSans: require('../../assets/fonts/NunitoSans.ttf'),
    });
    if (!loaded) {
        return null;
    }

    return (
        <ImageBackground source={image} style={styles.bg} >
            <Text style={styles.logo}>LOGO</Text>
            {isLoading && <ActivityIndicator size="large" style={styles.loading} />}
            <Text style={styles.text}>MuseAR</Text>
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    bg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0C0C0C',
    },
    logo: {
        fontSize: '30@s',
        color: 'white',
        fontFamily: 'NunitoSans',
    },
    text: {
        color: 'white',
        fontSize: '34@s',
        top: '230@vs',
        fontWeight: '500',
        letterSpacing: '5@s',
        fontFamily: 'NunitoSans',
    },
    loading: {
        top: '85@vs',
    },
})

export default SplashScreen