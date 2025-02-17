import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SearchHeader from '@/components/SearchHeader';
import Ticket from '@/components/Ticket';
import { apiToken } from '@/utils/api';
import axios from 'axios';

const SearchResultScreen = () => {
  const [isPending, setIsPending] = useState(false);
  const params = useLocalSearchParams<any>();
  const {flightOfferData} = params;
  const parsedFlightOfferData = JSON.parse(flightOfferData);
  const handleUpsellRequest = async (items: any) => {
    try {
     setIsPending(true);
     const apiUrl = `https://test.api.amadeus.com/v1/shopping/flight-offers/upselling`
     const requestBody = {
       data: {
         type: "flight-offers-upselling",
         flightOffers: [items],
         payments: [{
           brand: 'VISA_IXARIS',
           binNumber: 123456,
           flightOfferIds: [1]
         }]
       }
     }
     const requestOptions ={
       method: "POST",
       headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`
       },
       body: JSON.stringify(requestBody) 

     }
     const response = await fetch(apiUrl, requestOptions);
     const responseData = await response.json();
     const flightOfferData = responseData.data;
     if(response.ok){
       setIsPending(false)
       router.push({
         pathname: "/brandedupsell",
         params: {
           flightOfferData: JSON.stringify(flightOfferData)
         } 
       })
     } else {
       if((responseData.errors && responseData.errors[0].code === 39397) || responseData.errors[0].code === 4926){
           console.log("No upsell offer found");
           await handlePricingRequest(items)
       }
     }
    } catch (error) {
     console.log(error)
    }
}
const handlePricingRequest = async (item: any)=>{
 try {
   const response = await axios.post(
     "https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?include=detailed-fare-rules",
      {data: 
       {type: "flight-offers-pricing",
         flightOffers: [item]
      }},
      {
       headers: {
         "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`
       }
     }
   )
   setIsPending(false);
   const flightOfferPrice = response.data.data;
   router.push({
     pathname: "/flightdetails",
         params: {
           flightOfferPrice: JSON.stringify(flightOfferPrice)
         }
   })
 } catch (error: any) {
   console.log(error);
   Alert.alert("Error. Please try again later", error.message)
 }
}
  // console.log(parsedFlightOfferData.data)
  const renderFlightOfferData = (item: any, index: number) =>(
    <Pressable key={index} onPress={()=>handleUpsellRequest(item)} className='mb-8'>
      <Ticket key={index} item={item}/>
    </Pressable>
  )
 
  return (
    <View className="flex-1 items-center bg-[#f5f7fa]">
      {isPending && (
              <View className='absolute z-50 w-full h-full justify-center items-center'>
               <View className='bg-[#000] opacity-[0.45] w-full h-full justify-center items-center'></View>
                <View className='absolute'>
                  <ActivityIndicator size="large" color="#fff" style={{paddingTop: 20}}/>
                </View>
               </View>)}
      <View className="w-full h-full">
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
                      <Text className="text-lg text-white font-extrabold">Search Results</Text>
                    </View>
                    <View>
                      <View className="rounded-full bg-gray-500 h-10 w-10 justify-center items-center">
                        <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
                      </View>
                    </View>
             </View>
             <SearchHeader/>
           </View>
        </View>

        <ScrollView className='w-full' contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View className='w-full py-2 items-center justify-between'>
            <View>
              <View className='w-full px-6 py-2 flex-row justify-between items-center'>
                <View>
                  <Text className='text-lg font-semibold'>Search Results</Text>
                </View>
                <View className='flex-row justify-center items-center'>
                  <Text className='text-base font-semibold'>{parsedFlightOfferData?.data?.length} Results</Text>
                  </View>
              </View>
            </View>

            <View className='w-full'>
              <View className='w-full px-4'>
                {parsedFlightOfferData?.data.map(renderFlightOfferData)}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>  
    </View>
  )
}

export default SearchResultScreen