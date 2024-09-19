import { View, Text,StyleSheet,Image } from 'react-native'
import React, { useEffect } from 'react'


const Splash = ({navigation}) => {
  useEffect(()=>{
    setTimeout(() => {
      
    }, 2000);
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SG Technology</Text>
    </View>
  )
}

export default Splash

const styles= StyleSheet.create({
    container:{
        backgroundColor:'#0004FF',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
      fontSize:40,
      fontWeight:'700',
      color:'#fff'
    }

    
})