import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';

const SearchHeader = () => {
    const [searchFlightData, setSearchFlightData] = useState<any>(null);
    const originCity = searchFlightData?.originCity || '';
    const destinationCity = searchFlightData?.destinationCity || '';
    const depatureDate = searchFlightData?.depatureDate || '';
    const seats = searchFlightData?.seat || 0;

useEffect(()=>{
    const fetchSearchFlightData = async()=>{ 
        try {
           const data = await AsyncStorage.getItem('searchFlightData');
           if(data !== null){
            setSearchFlightData(JSON.parse(data))
           } 
        } catch (error) {
            console.log(error)
        }
    }
    fetchSearchFlightData()
},[])
  return (
    <>
      {searchFlightData && (
        <View>
            <View className='flex-row justify-center items-center px-2 w-full'>
                <View className='w-[70%] justify-between items-center flex-row pb-2'>
                    <Text className='text-white text-lg font-bold'>{originCity}</Text>
                      <Feather name='arrow-right' size={24} color='white'/>
                    <Text className='text-white text-lg font-bold'>{destinationCity}</Text>
                </View>
            </View>
            <View className='flex-row justify-center items-center px-2 w-full'>
                <View className='w-[80%] justify-between items-center flex-row'>
                    <Text className='text-sm text-neutral-400 font-bold'>{depatureDate}</Text>
                    <Octicons name="dot-fill" size={10} color="white" />
                    <Text className='text-sm text-neutral-400 font-bold'>{seats} Seats</Text>
                    <Octicons name="dot-fill" size={10} color="white" />
                    <Text className='text-sm text-neutral-400 font-bold'>Economy</Text>
                </View>
            </View>
        </View>
      )}
    </>
  )
}

export default SearchHeader