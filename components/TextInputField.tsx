import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TextInputField = ({label, value, onChangeText, placeholder, error}: any) => {
  return (
    <View className='w-full space-y-1 pb-4'>
      <Text className='text-lg font-bold text-gray-700'>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        className='py-4 border-2 rounded-xl border-gray-500 px-2' 
      />
      {error && <Text className='text-sm text-red-500'>{error}</Text>}
    </View>
  )
}

export default TextInputField