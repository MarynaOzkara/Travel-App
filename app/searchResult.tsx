import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SearchHeader from '@/components/SearchHeader';
import Ticket from '@/components/Ticket';

const SearchResultScreen = () => {
  const params = useLocalSearchParams<any>();
  const {flightOfferData} = params;
  const renderFlightOfferData = (item: any, index: number) =>{
    <Pressable key={index} onPress={()=>{}} className='mb-8'>
      <Ticket key={index} item={item}/>
    </Pressable>
  }
  console.log(flightOfferData)
  return (
    <View className="flex-1 items-center bg-[#f5f7fa]">
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

        <ScrollView className='w-full h-full'>
          <View className='w-full py-2 justify-between items-center'>
            <View>
              <View className='w-full px-6 py-2 flex-row justify-between items-center'>
                <View>
                  <Text className='text-lg font-semibold'>Search Results</Text>
                </View>
                <View className='flex-row justify-center items-center'>
                  <Text className='text-base font-semibold'>{flightOfferData?.data?.length} Results</Text>
                  </View>
              </View>
            </View>

            <View className='w-full'>
              <View className='w-full px-4 space-y-4'>
                {flightOfferData?.data.map((item: any, index: any) =>renderFlightOfferData(item, index))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>  
    </View>
  )
}

export default SearchResultScreen