import Header from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet,Text, View, ActivityIndicator, Pressable, TextInput } from 'react-native';
import {ArrowPathRoundedSquareIcon, ChevronDoubleRightIcon} from 'react-native-heroicons/outline';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useFocusEffect} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';





interface TripOptionProps {
  pageNavigation: string;
  handleNavigationChange: (type: string)=> void;
}
interface LocationInputProps {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onPress: () => void;
}
interface SearchFlightData {
    originCity: string;
    destinationCity: string;
    depatureDate: string;
    seat: number;
}
interface DepatureDateProps {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onPress: () => void;
}
export interface FlightOfferData{
    originLocationCode: string;
    destinationLocationCode: string;
    depatureDate: Date;
    returnDate: Date;
    adults: number;
    maxResults: number
}
const DepatureDate: React.FC<DepatureDateProps> = ({placeholder, icon, value, onPress}) =>(
  
     <Pressable onPress={onPress} className='border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center py-4'>
        <View className='px-4 flex-row justify-between items-center'>
          <View className='w-[15%] border-r-2 border-gray-300'>{icon}</View>
          <View className='w-[80%] px-4 justify-start items-start'>
            {value || placeholder}
          </View>
        </View>
     </Pressable>
 
)

const LocationInput: React.FC<LocationInputProps> = ({placeholder, icon, value, onPress}) =>(
  <View className='border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center'>
     <Pressable onPress={onPress}>
        <View className='px-4 flex-row justify-between items-center'>
          <View className='w-[15%] border-r-2 border-gray-300'>{icon}</View>
          <View className='w-[80%] py-3'>
            {value ? (
              <Text className='bg-transparent text-gray-600 font-bold'>{value}</Text>
            ) : (
              <Text className='bg-transparent text-lg text-gray-600 font-semibold'>{placeholder}</Text>
            )}
          </View>
        </View>
     </Pressable>
  </View>
)

const TripOption: React.FC<TripOptionProps> = ({pageNavigation, handleNavigationChange})=>(
  <View className='flex-row justify-between w-full px-4 py-2'>
    <Pressable className='flex-row w-1/2' onPress={() => handleNavigationChange('oneWay')}>
       <View className={`w-full justify-start items-center flex-row space-x-2 pb-2 ${pageNavigation === 'oneWay' ? "border-b-4 border-[#3182CE]" : "border-transparent"}`}>
        <ChevronDoubleRightIcon size={24} color={pageNavigation === 'oneWay' ? '#3182CE' : 'gray'}/>
         <Text style={{fontWeight: pageNavigation === 'oneWay' ? '700' : '500'}} className={`text-xl pl-2 ${pageNavigation === 'oneWay' ? 'text-[#3182CE]' : "text-gray-500"}`}>One Way</Text>
       </View>
    </Pressable>

    <Pressable className='flex-row w-1/2' onPress={() => handleNavigationChange("roundTrip")}>
       <View className={`w-full justify-start items-center flex-row space-x-2 pb-2 ${pageNavigation === 'roundTrip' ? "border-b-4 border-[#3182CE]" : "border-transparent"}`}>
         <ArrowPathRoundedSquareIcon size={24} color={pageNavigation === 'roundTrip' ? '#3182CE' : 'gray'} />
         <Text style={{fontWeight: pageNavigation === 'roundTrip' ? '700' : '500'}} className={`text-xl pl-2 ${pageNavigation === 'roundTrip' ? 'text-[#3182CE]' : "text-gray-500"}`}>Round Trip</Text>
       </View>
    </Pressable>

  </View>)

export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [session, setSession] = useState(null);
  const [pageNavigation, setPageNavigation] = useState('oneWay');
  const [flightOfferData, setFlightOfferData] = useState<FlightOfferData>({
    originLocationCode: '',
    destinationLocationCode: '',
    depatureDate: new Date(),
    returnDate: new Date(),
    adults: 0,
    maxResults: 10
  })
  const [searchFlightData, setSearchFlightData] = useState<SearchFlightData>({
    originCity: '',
    destinationCity: '',
    depatureDate: '',
    seat: 0
  })
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const handleNavigationChange = (type: string)=> setPageNavigation(type);
  useEffect(() =>{
    const loadSelectedDestination = async() =>{
      try {
        const depatureCities = await AsyncStorage.getItem('depatureCities');
        const destinationCities = await AsyncStorage.getItem('destinationCities');
        const depatureDate = await AsyncStorage.getItem('depatureDate');

        if(depatureCities !== null){
          const depatureCitiesArray = JSON.parse(depatureCities);
          const lastAddedItem = depatureCitiesArray[depatureCitiesArray.length - 1];
          setSearchFlightData((prev) => ({...prev, originCity: lastAddedItem.city}));
          setFlightOfferData((prev) =>({...prev, originLocationCode: lastAddedItem.iataCode}))
        }
        if(destinationCities !== null){
          const destinationCitiesArray = JSON.parse(destinationCities);
          const lastAddedItem = destinationCitiesArray[destinationCitiesArray.length - 1];
          setSearchFlightData((prev) => ({...prev, destinationCity: lastAddedItem.city}));
          setFlightOfferData((prev) =>({...prev, destinationLocationCode: lastAddedItem.iataCode}))
        }
        if(depatureDate !== null){
          setSelectedDate(depatureDate)
          setSearchFlightData((prev) => ({...prev, depatureDate: depatureDate}));
          // setFlightOfferData((prev) =>({...prev, depatureDate: depatureDate}))
        }
      } catch (error) {
        console.log(error)
      }
    }
    loadSelectedDestination();
    setRefreshData(false)
  },[refreshData])
  const handleBackFromPrevScreen = ()=>{
    setRefreshData(true)
  }
 useFocusEffect(
  useCallback(()=>{
    handleBackFromPrevScreen()
  },[session])
 )
  return (
    <View className='flex-1 items-center bg-[#f5f7fa] relative'>
      <StatusBar style='light'/>

      {isPending && (
        <View className='absolute z-50 w-full h-full justify-center items-center'>
         <View className='bg-[#000] opacity-[0.45] w-full h-full justify-center items-center'></View>
          <View className='absolute'>
            <ActivityIndicator size="large" color="#fff" style={{paddingTop: 20}}/>
          </View>
         </View>)}
      {/* Header */}
      <View style={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} className='h-64 mb-4 relative pt-16 justify-start border-orange-600 w-full bg-[#192032]'>
        <Header/>
      </View>

      {/* Search form */}
      <View className='w-full px-4 -mt-32 mx-4'>
        <View className='bg-white rounded-3xl pt-2 pb-4 shadow-md shadow-slate-300'>
          <View className='flex-row justify-between w-full px-4 py-2'>
            <TripOption pageNavigation={pageNavigation} handleNavigationChange={handleNavigationChange}/>
          </View>
           {/* Origin City */}
              <LocationInput 
                  placeholder={searchFlightData.originCity ? searchFlightData.originCity : "Depature"} 
                  icon={<FontAwesome5 name="plane-departure" size={20} color="gray" />} 
                  value={searchFlightData.originCity} 
                  onPress={()=>router.push('/depature')}/>
            {/*Destination City  */}
              <LocationInput 
                  placeholder={searchFlightData.destinationCity ? searchFlightData.destinationCity : "Destination"} 
                  icon={<FontAwesome5 name="plane-arrival" size={20} color="gray" />} 
                  value={searchFlightData.destinationCity} 
                  onPress={()=>{}}/>
            {/*Depature Date  */}
            <DepatureDate
                placeholder={selectedDate && selectedDate.length > 0 ? selectedDate.replace(/^"|"$/g, "") : 'Depature Date'}
                icon={<FontAwesome5 name="calendar-alt" size={20} color="gray" />}
                value={searchFlightData.depatureDate.replace(/^"|"$/g, "")}
                onPress={() =>{}}
                />
            {/* Seat */}
            <View className='border-2 border-gray-300 mx-4 rounded-2xl py-3 justify-center flex-row items-center pl-4'>
               <View className='w-[15%] border-r-2 border-gray-300'>
                  <MaterialCommunityIcons name="seat-passenger" size={20} color="gray"/>
               </View>
               <TextInput
                 className='w-[85%] text-base px-4 font-semibold text-gray-600'
                 placeholder='Seat'
                 keyboardType='numeric'
                 value={String(searchFlightData.seat)}
                 onChangeText={(text)=>{
                  const seatValue = parseInt(text, 10);
                  const validSeatValue = isNaN(seatValue) ? 0 : seatValue;
                  setSearchFlightData((prev)=>({...prev, seat: validSeatValue}));
                  setFlightOfferData((prev) =>({...prev, adults: validSeatValue}))
                 }}
               />
            </View>
            {/* Search Button */}
            <View className='w-full justify-start pt-2 px-4 mt-2'>
              <Pressable onPress={()=>{}} className='bg-[#3182CE] rounded-lg justify-center items-center py-3'>
                <Text className='text-white font-bold text-lg'>Search</Text>
              </Pressable>
            </View>
        </View>  
      </View>
    </View>
  );
}


const styles = StyleSheet.create({})