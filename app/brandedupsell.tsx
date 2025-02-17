import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const BrandedupsellScreen = () => {
    const params = useLocalSearchParams<any>();
      const {flightOfferData} = params;
      console.log(flightOfferData)
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
                      <Text className="text-lg text-white font-extrabold">Branded Upsell</Text>
                    </View>
                    <View>
                      <View>
                      <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
                      </View>
                    </View>
             </View>
           </View>
        </View>
      </View>
    </View>
  )
}

export default BrandedupsellScreen