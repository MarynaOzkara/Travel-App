import Header from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, StyleSheet, Platform, View, ActivityIndicator } from 'react-native';


export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false);
  return (
    <View className='flex-1 items-center bg-[#f5f7fa] relative'>
      <StatusBar style='light'/>

      {isPending && (
        <View className='absolute z-50 w-full h-full justify-center items-center'>
         <View className='bg-[#000] opacity-[0.45] w-full h-full justify-center items-center'></View>
          <View className='absolute'>
            <ActivityIndicator size="large" color="#fff" style={{paddingTop: 20}}/>
          </View>
         </View>)}
      
      <View style={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} className='h-64 mb-4 relative pt-16 justify-start border-orange-600 w-full bg-[#192032]'>
        <Header/>
      </View> 
    </View>
  );
}


const styles = StyleSheet.create({})