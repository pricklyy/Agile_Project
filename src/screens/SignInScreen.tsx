import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,TextInput, Alert} from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import axios from 'axios';
import { API_LOGIN } from '../../config/apiConfig';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation} : any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_LOGIN}`, {
        email: email,
        password : password,
      });

      
      Alert.alert('Success', 'Login successful.');
      navigation.replace('HomeStack')
      console.log(response.data);
     

      
    } catch (error) {
      console.log(error)
  };
}

const storeAuthInfo = async({value}: any) => {
  try {
    const authInfo = JSON.stringify(value);
    await AsyncStorage.setItem('authInfo',authInfo);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <SafeAreaView style={{backgroundColor:COLORS.primaryWhiteHex}}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text1}>Login here</Text>
          <Text style={styles.text2}>Welcome back you've been missed!</Text>
        </View>

        <View style={styles.input}>
          <TextInput placeholder='Email' style={styles.textInput} value={email} onChangeText={setEmail} />
          <TextInput placeholder='Password' style={styles.textInput} value={password} onChangeText={setPassword} secureTextEntry={true} />
        </View>

        <View>
          <TouchableOpacity >
          <Text style={styles.text3}>Forgot Your Password ?</Text>
          </TouchableOpacity>
          
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} >
          <Text style={styles.textButton}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('SignUp')
        }}>
          <Text style={styles.text2}>Create new account</Text>
        </TouchableOpacity>

        <View style={{marginVertical:SPACING.space_10 * 3}}>
        <Text style={styles.text2}>Or continue with</Text>

        <View style={styles.view1}>
          <TouchableOpacity style={styles.logo}>
          <ImageBackground source={require('../assets/images/google.png')} resizeMode='contain' style={styles.img}  />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logo}>
          <ImageBackground source={require('../assets/images/facebook.png')} resizeMode='contain' style={styles.img}  />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logo}>
          <ImageBackground source={require('../assets/images/apple-logo.png')} resizeMode='contain' style={styles.img}  />
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    padding:SPACING.space_10 *2,
  },
  text1: {
    fontSize:FONTSIZE.size_30,
    color:COLORS.cam,
    fontFamily:FONTFAMILY.poppins_semibold,
    marginVertical: SPACING.space_10 * 3,
    textAlign:'center',
  },
  text2 : {
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_bold,
    textAlign: 'center',
    
    
  },
  input: {
    marginVertical : SPACING.space_10 * 3,
  },
  textInput: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_12,
    padding:SPACING.space_12 * 2 ,
    backgroundColor:COLORS.xam,
    borderRadius: BORDERRADIUS.radius_20,
    marginVertical : SPACING.space_10,
    
  },
  text3: {
    fontSize:FONTSIZE.size_14,
    color:COLORS.cam,
    fontFamily: FONTFAMILY.poppins_bold,
    alignSelf:'flex-end',

  },
  button : {
    padding: SPACING.space_8 * 2,
    backgroundColor : COLORS.cam,
    marginVertical : SPACING.space_10 * 5,
    borderRadius : BORDERRADIUS.radius_20,
    
  },
  textButton: {
    fontFamily:FONTFAMILY.poppins_bold,
        color:COLORS.primaryWhiteHex,
        textAlign:'center',
        fontSize:FONTSIZE.size_20,
  },
  img :{
    width: SPACING.space_20 * 2,
    height: SPACING.space_20 * 2,
  },
  view1 : {
    marginTop : SPACING.space_10,
    flexDirection : 'row',
    justifyContent : 'center'
  },
  logo : {
    padding : SPACING.space_18,
    
  }
})