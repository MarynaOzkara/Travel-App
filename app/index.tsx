import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

const WelcomeScreen = () => {
  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: '#AAC9E5'}}>
       <StatusBar style='light'/>
        <View className="h-full">
            <View className='w-full px-4 items-center my-8'>
                <Animated.View entering={FadeInDown.duration(200).springify()} className='flex-row justify-center items-center pb-24'>
                    <MaterialCommunityIcons name="airplane" size={24} color="#2B6CB0"/>
                    <Text className='text-white text-xl font-semibold leading-[60px] pl-1 uppercase'>MakeYour</Text>
                    <Text className='text-[#2B6CB0] text-xl font-bold leading-[60px] uppercase italic'>travel</Text>
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(200).delay(200).springify()}>
                    <Text className='text-[#2D3748] text-[52px] font-medium leading-[60px]'>Discover your Dream Travel Easily</Text>
                </Animated.View>
                <Animated.View className='mt-4' entering={FadeInDown.duration(200).delay(400).springify()}>
                    <Text className='text-[#4A5568] text-ld font-medium leading-[20px]'>Find an easy way to buy airplane tickets and hotels with just a few clicks in the application.</Text>
                </Animated.View>
                <Animated.View className='h-1/4 w-full justify-start pt-8 px-4' entering={FadeInDown.duration(200).delay(600).springify()}>
                <Pressable onPress={()=> router.push('/(tabs)')} className='bg-[#2B6CB0] rounded-xl justify-center items-center py-4'>
                    <Text className='text-white font-bold text-xl'>Discover</Text>
                </Pressable>
                <View className='flex-row w-full justify-center mt-3 gap-2'>
                    <Text className='font-medium text-[#4A5568] text-center'>Don't have an account?</Text>
                    <Text className='font-bold text-[#2B6CB0] text-center'>Register</Text>
                </View>
                </Animated.View>
            </View>
        </View> 
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})