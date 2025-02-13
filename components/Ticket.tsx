import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

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
  const formatDuration = (segments: any)=>{
    // console.log(segments)
    let totalDurationMs = 0;
    segments.forEach((segment: any) => {
     
      const {arrival, departure} = segment;
      
      if(departure && arrival){
        const arrivalAt = arrival.at;
        const depatureAt = departure.at;
      
        const depatureTime = Date.parse(depatureAt);
        const arrivalTime = Date.parse(arrivalAt);
        
        const segmentDurationMs = arrivalTime - depatureTime;
        totalDurationMs = segmentDurationMs;
        
      }
      
    });
    // console.log(totalDurationMs)
  const totalDurationHours = Math.floor(totalDurationMs / (1000 * 60 * 60));
  const totalDurationMinets = Math.floor((totalDurationMs % (1000 * 60 * 60)) / (1000 * 60))  
return `${totalDurationHours} h ${totalDurationMinets} min`
  }
 const formatTime = (time: string)=>{
  
    if(time){
      const date = new Date(time);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else {
      return '';
    }
 }
  // console.log(parsedSearchFlightData)
  console.log(item)
  return (
    <View className='bg-white drop-shadow-sm bg-blend-darken mix-blend-hard-light w-full px-4 rounded-xl'>

      <View className='justify-between items-center flex-row py-4'>
        <View className='w-16'>
          <Text className='text-lg font-semibold'>{item?.itineraries[0]?.segments[0]?.carrierCode}</Text>
        </View>

        <View className='bg-[#3182CE] rounded-full px-4 py-1'>
          <Text className='text-sm text-white font-semibold'>Recommended</Text>
        </View>
      </View>

       {/* Cities */}
       <View className='justify-between items-center flex-row py-2 w-full'>
        {/* Depature */}
        <View className='w-1/4 items-start flex-row justify-start'>
           <Text className='text-sm font-semibold text-[#4A5568]'>{parsedSearchFlightData && parsedSearchFlightData?.originCity}</Text>
        </View>

        <View className='w-2/4 justify-center items-center'>
          <Text className='text-base text-black font-semibold'>
            {formatDuration(item?.itineraries[0]?.segments)}
          </Text>
        </View>
        {/* Arrival */}
        <View className='w-1/4 items-start flex-row justify-end'>
           <Text className='text-sm font-semibold text-[#4A5568]'>{parsedSearchFlightData && parsedSearchFlightData?.destinationCity}</Text>
        </View>

       </View>
      {/* Depature and Arrival iata code */}
      <View className='justify-between items-center flex-row py-2 w-full relative'>
         <View className='w-1/3 items-start flex-row gap-1 justify-start'>
            <Text className='font-bold text-sm'>
              {item?.itineraries[0]?.segments[0]?.departure?.iataCode}
            </Text>
         </View>
         <View className='w-1/3 items-center justify-center'>
             <FontAwesome5 name='plane' size={24} color="#3182CE"/>
         </View>

         <View className='w-1/3 items-end flex-row gap-1 justify-end'>
            <Text className='font-bold text-sm'>
              {item?.itineraries[0]?.segments[0]?.arrival?.iataCode}
            </Text>
         </View>
      </View>

      {/* Departure and Arrival time */}
      <View className='justify-between items-center flex-row py-2 w-full relative'>
        <View className='w-1/3 items-start'>
          <Text>
            {formatTime(item?.itineraries[0]?.segments[0]?.departure?.at)}
          </Text>
        </View>
         
        <View className='w-1/3 items-center justify-center'>
           <Text className='text-sm font-bold'>
            {item?.itineraries[0]?.segments.reduce(
              (total: any, index: any) =>
                (index === 0 ? total : total + 1), 0
            )} Stops
           </Text>
        </View>

        <View className='w-1/3 items-end'>
          <Text>
            {formatTime(item?.itineraries[0]?.segments[1]?.arrival?.at) 
            ? formatTime(item?.itineraries[0]?.segments[1]?.arrival?.at) 
            : formatTime(item?.itineraries[0]?.segments[0]?.arrival?.at)}
          </Text>
        </View>
      </View>
      {/* Price */}
      <View className='justify-between items-center flex-row py-2 w-full relative'>
        <View className='py-1 w-1/2 items-center justify-start flex-row'>
           <MaterialIcons name='flight-class' size={24} color="#3182CE"/>
           <Text className='text-sm font-bold capitalize'>
             {item?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin.length > 15 
             ? item?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin.slice(0, 15) + '...' 
             : item?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin}
           </Text>
        </View>

        <View className='py-1 w-1/2 items-center flex-row justify-end'>
           <Text className='text-sm font-bold text-[#3182CE]'>
              {Math.round(item?.price?.grandTotal)} {item?.price?.currency}
           </Text>
        </View>
      </View>
    </View>
  )
}

export default Ticket