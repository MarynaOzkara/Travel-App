import { View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {Calendar} from 'react-native-calendars'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DepatureDateScreen = () => {
    const [flightOfferData, setFlightOfferData] = useState<any>({
        depatureDate: new Date()
      });
      // console.log(flightOfferData.depatureDate.toISOString().split("T")[0])
const saveDepatureDate =async ()=>{
  try {
    const depatureDate = new Date(flightOfferData.depatureDate);
    const dateString = depatureDate.toISOString().split("T")[0];
    await AsyncStorage.setItem('depatureDate', dateString);
    Alert.alert("Success",'Depature date saved successfully')
  } catch (error) {
    console.log(error)
  }
}      
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
                      <Text className="text-lg text-white font-extrabold">Depature Date</Text>
                    </View>
                    {/* <View>
                      <View>
                      <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
                      </View>
                    </View> */}
                    <View>
                      <Pressable 
                          className='h-10 w-10 justify-center items-center'
                          onPress={()=> saveDepatureDate()}
                          >
                         <Text className='text-white text-lg font-bold'>Save</Text>
                      </Pressable>
                    </View>
             </View>
           </View>
        </View>
        {/* Calender View */}
        <View>
           <Calendar
              onDayPress={(day: any) => {
                
                setFlightOfferData({
                    ...flightOfferData,
                    depatureDate: new Date(day.dateString),  
                })
                // console.log('selected day', new Date(day.dateString));
              }}
              markedDates={{
                [flightOfferData.depatureDate.toISOString().split("T")[0]]: { selected: true, selectedColor: "#3182CE", disableTouchEvent: true },
              }}
           />
        </View>
      </View>  
    </View>
  )
}

export default DepatureDateScreen