import Header from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet,Text, View, ActivityIndicator, Pressable } from 'react-native';
import {ArrowPathRoundedSquareIcon, ChevronDoubleRightIcon} from 'react-native-heroicons/outline';



interface TripOptionProps {
  pageNavigation: string;
  handleNavigationChange: (type: string)=> void;
}

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
  const [pageNavigation, setPageNavigation] = useState('oneWay');
  const handleNavigationChange = (type: string)=> setPageNavigation(type)
  
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
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({})