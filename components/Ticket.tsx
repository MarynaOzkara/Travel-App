import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Ticket = ({item}: any) => {
  const [searchFlightData, setSearchFlightData] = useState<any>(null)
  useEffect(()=>{
    const fetchSearchFlightData = async()=>{
      try {
        const data = await AsyncStorage.getItem('searchFlightData');
        setSearchFlightData(data)
        
      } catch (error) {
        console.log(error)
      }
    }
fetchSearchFlightData()
  },[])
  const parsedSearchFlightData = JSON.parse(searchFlightData)
  
  console.log(parsedSearchFlightData)
  return (
    <View className='bg-white drop-shadow-sm bg-blend-darken mix-blend-hard-light w-full px-4 rounded-xl'>

      <View className='justify-between items-center flex-row py-4'>
        <View className='w-16'>
          <Text>{item?.itineraries[0]?.segments[0]?.carrierCode}</Text>
        </View>

        <View className='bg-[#3182CE] rounded-full px-4 py-1'>
          <Text className='text-sm text-white font-semibold'>Recommended</Text>
        </View>
      </View>

       {/* Arrival */}
       <View className='justify-between items-center flex-row py-2 w-full'>
        {/* Depature */}
        <View className='w-1/4 items-start flex-row justify-start'>
           <Text className='text-sm font-semibold text-[#4A5568]'>{parsedSearchFlightData && parsedSearchFlightData?.originCity}</Text>
        </View>

        <View className='w-2/4 justify-center items-center'>
          <Text className='text-base text-black font-bold'>
            {formatDuration(item?.itineraries[0].segments[0].duration)}
          </Text>
        </View>
       </View>
      {/* Depature and Arrival iata code */}
      <View className='justify-between items-center flex-row py-2 w-full relative'></View>
    </View>
  )
}

export default Ticket