import { View, Text, TextInput, TouchableOpacity, Alert, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/color';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../screens/firebaseConfig';
import { useFonts } from 'expo-font';
import { ScaledSheet } from "react-native-size-matters"

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [loaded] = useFonts({
    NunitoSans: require('../../assets/fonts/NunitoSans.ttf'),
    NunitoSansBold: require('../../assets/fonts/NunitoSansBold.ttf')
  });
  if (!loaded) {
      return null;
  }

  const registerUser = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert('Başarılı', 'Kayıt işlemi başarılı.');
      navigation.navigate('Login'); // Kayıt başarılı olunca Login ekranına yönlendir
    } catch (error) {
      setLoading(false);
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Hesap Oluştur
          </Text>
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>E-mail</Text>
          <View style={styles.emailInput}>
            <TextInput
              placeholder='E-posta adresinizi giriniz'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={{ width: '100%' }}
              onChangeText={setEmail}
              autoCapitalize='none'
            />
          </View>
        </View>

        <View style={styles.telContainer}>
          <Text style={styles.telText}>Telefon Numarası</Text>
          <View style={styles.telInput}>
            <TextInput
              placeholder='+90'
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={styles.inputKod}
            />
            <TextInput
              placeholder='Telefon numaranızı giriniz'
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={styles.telNuGirin}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View style={styles.sifreContainer}>
          <Text style={styles.sifreText}>Şifre</Text>
          <View style={styles.sifreInput}>
            <TextInput
              placeholder='Şifrenizi giriniz'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{ width: '100%' }}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={styles.sifreGoster}>
              {isPasswordShown ? (
                <Ionicons name='eye-off' size={24} color={COLORS.black} />
              ) : (
                <Ionicons name='eye' size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button title={loading ? 'Yükleniyor...' : 'Kaydol'} filled style={styles.button} onPress={registerUser} disabled={loading} />

        <View style={styles.loginContainer}>
          <View style={styles.line} />
          <Text style={styles.text}>YA DA</Text>
          <View style={styles.line} />
        </View>

        <View>
          <TouchableOpacity onPress={() => console.log('Pressed')} style={styles.socialmedia}>
            <Image source={require('../../assets/facebook.png')} style={styles.socialmediaImg} resizeMode='contain' />
            <Text style={styles.socialmediaText}>Facebook ile devam et</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Pressed')} style={styles.socialmedia}>
            <Image source={require('../../assets/google.png')} style={styles.socialmediaImg} resizeMode='contain' />
            <Text style={styles.socialmediaText}>Google ile devam et</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lastContainer}>
          <Text style={styles.lastText}>Zaten hesabın var mı?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupText}>Giriş Yap</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    marginHorizontal: '22@s'
  },
  titleContainer: {
    marginVertical: '22@s'
  },
  titleText: {
    fontSize: '24@s',
    color: COLORS.black,
    fontFamily: 'NunitoSansBold',
  },
  emailContainer: {
    marginBottom: '12@s'
  },
  emailText: {
    fontSize: '16@s',
    fontWeight: '400',
    marginVertical: '8@s'
  },
  emailInput: {
    width: '100%',
    height: '48@s',
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: '8@s',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '22@s'
  },
  telContainer: {
    marginBottom: '12@s'
  },
  telText: {
    fontSize: '16@s',
    fontWeight: '400',
    marginVertical: '8@s'
  },
  telInput: {
    flexDirection: 'row',
    width: '100%',
    height: '48@s',
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: '8@s',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '12@s'
  },
  inputKod: {
    width: '12%',
    borderRightWidth: 1,
    borderLeftColor: COLORS.grey,
    height: '100%'
  },
  telNuGirin: {
    width: '80%',
    marginStart: '12@s'
  },
  sifreContainer: {
    marginBottom: '12@s'
  },
  sifreText: {
    fontSize: '16@s',
    fontWeight: '400',
    marginVertical: '8@s'
  },
  sifreInput: {
    width: '100%',
    height: '48@s',
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: '8@s',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '22@s'
  },
  sifreGoster: {
    position: 'absolute',
    right: '12@s'
  },
  button: {
    marginTop: '18@s',
    marginBottom: '12@s',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '20@s',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: '10@s'
  },
  text: {
    fontSize: '14@s',
    fontFamily: 'NunitoSans',
  },
  socialmedia: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '45@s',
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: '4@s',
    borderRadius: '10@s',
    marginBottom: '8@s',
  },
  socialmediaImg: {
    height: '30@s',
    width: '30@s',
    marginRight: '8@s'
  },
  socialmediaText: {
    fontFamily: 'NunitoSans',
    fontSize: '16@s',
  },
  lastContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '12@s',
    marginBottom: '10@s'
  },
  lastText: {
    fontSize: '16@s',
    fontFamily: 'NunitoSans',
  },
  signupText: {
    fontSize: '16@s',
    color: '#218DF0',
    fontFamily: 'NunitoSansBold',
    marginLeft: '6@s'
  }
})

export default Signup;