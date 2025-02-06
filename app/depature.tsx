import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import {apiToken} from '../utils/api'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const DepatureScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [flightOfferData, setFlightOfferData] = useState<any>({
    originLocationCode: ''
  });
  const [prevSelectedDepature, setPrevSelectedDepature] = useState<any>([]);
  const loadPrevSelectedCities = async()=> {
    try {
      const cities = await AsyncStorage.getItem('depatureCities');
      if(cities !== null){
        setPrevSelectedDepature(JSON.parse(cities))
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    loadPrevSelectedCities()
  },[])
  const debounce = (func: any, delay: number) =>{
    let timeoutId;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(()=> func.apply(this, args), delay)
    }
  }
  const autoCompliteSearch = async(searchInput: string)=>{
    try {
      const headers = {
        Authorization: `Bearer ${apiToken}`
      }
      const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${searchInput}`;
      const response = await axios.get(url, {headers});
      setAutoCompleteResults(response.data.data)
    } catch (error) {
      if(error.response && error.response.status === 429){
        console.log('Rate limits exceeded. Try again later.')
      }
      console.log(error)
    }
  }
  const debounceSearch = debounce(autoCompliteSearch, 5000)
  const handleInputChange = (value: string)=>{
      setSearchInput(value);
      debounceSearch(value)
  }
  const handleSelectAutoComplete = async(item: any)=>{
    const prevSelectedCities = [...prevSelectedDepature];
    prevSelectedCities.push({city: item.name, iataCode: item.iataCode});
    await AsyncStorage.setItem('depatureCities', JSON.stringify(prevSelectedCities));
    setPrevSelectedDepature(prevSelectedCities)
    setFlightOfferData({...flightOfferData, originLocationCode: item.iataCode});
    setSearchInput(`${item.name} (${item.iataCode})`);
    setAutoCompleteResults([]);
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
                      <Text className="text-lg text-white font-extrabold">Select Depature</Text>
                    </View>
                    <View>
                      <View>
                      <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
                      </View>
                    </View>
             </View>
           </View>
        </View>
        {/* Airport or City Search */}
        <View className="w-full py-4 px-4 relative">
          <View className="flex-row justify-between items-center bg-white border-2 border-gray-400 rounded-xl h-14 overflow-hidden">
            <View className="w-full h-full justify-center">
              <TextInput 
                  placeholder="Search for airport or city" 
                  placeholderTextColor="gray" 
                  value={searchInput} 
                  onChangeText={handleInputChange}
                  className="bg-transparent text-gray-600 h-full px-2 capitalize"
                  />
            </View>
          </View>
          {/*Auto Complete Results  */}
          {autoCompleteResults.length > 0 && (
            <View className="border-2 border-gray-400 bg-white rounded-xl shadow-sm mt-4">
              <FlatList data={autoCompleteResults} keyExtractor={(item) => item.id} renderItem={({item}) => (
                <Pressable className="px-2 py-2 rounded-xl my-1" onPress={()=>handleSelectAutoComplete(item)}>
                  <Text className="text-gray-500 capitalize">{item.name}{item.iataCode}</Text>
                </Pressable>
              )}/>
            </View>
          )}

          {/* Prev Selected Cities */}
          <View className="px-4 w-full">
            <Text className="text-gray-500 text-lg font-bold mt-4">Previouse Selected</Text>
              {prevSelectedDepature.map(({city, index})=>(
                <Pressable
                   key={index}
                   onPress={()=>{
                    setFlightOfferData({...flightOfferData, originLocationCode: city.iataCode});
                    setSearchInput(`${city.city} (${city.iataCode})`)
                   }}
                   className="bg-white borde-2 border-gray-400 rounded-xl px-2"
                >
                  <Text className="text-gray-500 capitalize">{city.city} ({city.iataCode})</Text>
                </Pressable>
              ))}

          </View>
        </View>
      </View>
       
    </View>
  );
};

export default DepatureScreen;
