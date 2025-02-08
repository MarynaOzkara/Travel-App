import { View, Text } from 'react-native'
import React from 'react'

const Ticket = ({item}) => {
  return (
    <View className='bg-white drop-shadow-sm bg-blend-darken mix-blend-hard-light w-full px-4 py-2 rounded-xl'>
      <Text>Tickets</Text>

      <View className='justify-between items-center flex-row py-2'>
        <View></View>
      </View>
    </View>
  )
}

export default Ticket