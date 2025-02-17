import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';


const FlightdetailsScreen = () => {
    const params = useLocalSearchParams<any>();
    const {flightOfferPrice} = params;
    const parsedFlightOfferPrice = JSON.parse(flightOfferPrice);
    const formatedDate = (timestamp: any) =>{
        const date = new Date(timestamp);
        const options ={
            month: "short",
            day: "numeric",
            year: "numeric",
            weekday: "short"
        }
        return date.toLocaleDateString("en-US", options)
    }
    console.log(flightOfferPrice)
  return (
    <View className='flex-1 items-center bg-[#f5f7fa]'>
      <View className='w-full h-full'>
        <View style={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} className='relative pt-16 justify-start border-orange-600 w-full bg-[#192032] pb-8'>
           <View>
            {/* Header */}
             <View className="flex-row gap-4 justify-start items-center px-2">
                <Pressable
                    className="flex-row gap-2 items-center justify-start h-14 w-[20%]"
                    onPress={()=>router.back()}>
                      <View className="rounded-full bg-gray-500 h-10 w-10 justify-center items-center">
                      <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
                      </View>
                    </Pressable>
                    <View className="w-[60%] justify-center items-center flex-row">
                      <Text className="text-lg text-white font-extrabold">Flight Details</Text>
                    </View>
                    <View>
                      <View>
                      <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
                      </View>
                    </View>
             </View>
           </View>
        </View>

        <ScrollView 
           className='w-full h-full'
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{
             justifyContent: "center",
             alignItems: "center",
             paddingBottom: 200
           }}
           >
            <View className='px-4 w-full my-4'>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row justify-center items-center'>
                        <Text className='text-lg justify-center items-center'>
                            {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.iataCode}
                            {" "}-{" "}
                        </Text>
                        <Text className='text-lg justify-center items-center'>
                            {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.iataCode}
                        </Text>
                    </View>
                    <View>
                        <Text className='text-base'>Fare Rules</Text>
                    </View>
                </View>

                {/* First Flight Details */}
                <View className='py-2 flex-row justify-between items-start my-4 bg-white h-64 drop-shadow-sm px-4'>
                    <View className='w-1/4 justify-between h-full flex-row'>
                        <View className='h-full justify-between w-3/4 items-end'>
                           <View>
                               <Text className='text-gray-500 font-bold text-base text-right'>
                                {formatedDate(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.at) }
                               </Text>
                           </View>
                           <View>
                               <Text className='text-gray-500 font-bold text-base text-right'>
                                {formatedDate(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.at) }
                               </Text>
                           </View>
                        </View>

                        <View className='w-1/4 justify-center items-center'>
                       <View>
                           <Octicons name='dot-fill' size={24} color="red"/>
                       </View>
                       <View className='border-l-2 border-red-600 h-[70%]'></View>
                       <View>
                           <Octicons name='dot-fill' size={24} color="red"/>
                       </View>
                       <View className='border-l-2 border-red-600 h-[10%]'></View>
                    </View>
                    </View>

                    
                </View>
            </View>
           </ScrollView>
      </View>
    </View>
  )
}

export default FlightdetailsScreen

