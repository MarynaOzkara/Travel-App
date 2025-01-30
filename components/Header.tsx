import { View, Text, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View className='flex-row justify-between items-center px-4'>
        <View className='w-1/2 flex-row h-16 items-center'>
            <View className='pr-2'>
               <View className='overflow-hidden'>
                   <Image source={require('../assets/images/me.jpg')} className='w-12 h-12 border-2 border-white rounded-full'/>
               </View>
            </View>
            <View>
                 <Text className='text-neutral-300 text-bas font-medium'>Welcome back,</Text>
                 <Text className='text-white text-xl font-bold'>Maryna 👋</Text>
            </View>
        </View>
        <View className='w-1/2 flex-row justify-end items-center h-16'>
           <View className='bg-gray-600 w-fit rounded-full px-4 justify-center h-full flex-row items-center gap-2'>
              <View className='bg-gray-500 rounded-full w-8 h-8 justify-center items-center'>
                 <Text className='text-white font-semibold'>P</Text>
              </View>
              <View className='justify-start items-start'>
                 <Text className='text-base text-gray-400'>Flight Point</Text>
                 <Text className='text-white'>✈ 5,345</Text>
              </View>
           </View>
        </View>
      
    </View>
  )
}

export default Header