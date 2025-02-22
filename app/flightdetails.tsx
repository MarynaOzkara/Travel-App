import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';


const FlightdetailsScreen = () => {
    const params = useLocalSearchParams<any>();
    const {flightOfferPrice} = params;
    const parsedFlightOfferPrice = JSON.parse(flightOfferPrice);
    const formatedDate = (timestamp: any) =>{
        const date = new Date(timestamp);
        const options ={
            month: "short",
            day: "numeric",
            year: "numeric",
            weekday: "short"
        }
        return date.toLocaleDateString("en-US", options)
    }
    const formatTime = (time: string)=>{
  
      if(time){
        const date = new Date(time);
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      } else {
        return '';
      }
   }
   const calculateDurationFlightTime = (depatureTime, arrivalTime)=>{
      const depature = new Date(depatureTime);
      const arrival = new Date(arrivalTime);
      const duration = arrival - depature;
      const hours = Math.floor((duration) / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours}h ${minutes}min`
   }
   const calculateTripDuration = (segments: any)=>{
    let totalDurationMs = 0;
    for(let i=0; i < segments.length; i++ ){
      const depatureTime = new Date(segments[i].departure.at);
      const arrivalTime = new Date(segments[i].arrival.at);
      const segmentsDuratinMs = arrivalTime - depatureTime;
      totalDurationMs += segmentsDuratinMs;

      const totalDurationHours = Math.floor(totalDurationMs / (1000 * 60 * 60));
      const totalDurationMinutes = Math.floor((totalDurationMs % (1000 * 60 * 60)) / (1000 * 60));

      return `${totalDurationHours}h ${totalDurationMinutes}min`
    }
   }
    console.log(flightOfferPrice)
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
                      <Text className="text-lg text-white font-extrabold">Flight Details</Text>
                    </View>
                    <View>
                      <View>
                      <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
                      </View>
                    </View>
             </View>
           </View>
        </View>

        <ScrollView 
           className='w-full h-full'
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{
             justifyContent: "center",
             alignItems: "center",
             paddingBottom: 200
           }}
           >
            <View className='px-4 w-full my-4'>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row justify-center items-center'>
                        <Text className='text-lg justify-center items-center'>
                            {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.iataCode}
                            {" "}-{" "}
                        </Text>
                        <Text className='text-lg justify-center items-center'>
                            {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.iataCode}
                        </Text>
                    </View>
                    <View>
                        <Text className='text-base'>Fare Rules</Text>
                    </View>
                </View>

                {/* First Flight Details */}
                <View className='py-2 flex-row justify-between items-start my-4 bg-white h-64 drop-shadow-sm px-4'>
                    <View className='w-1/4 justify-between h-full flex-row'>
                        <View className='h-full justify-between w-3/4 items-end'>
                           <View>
                               <Text className='text-gray-500 font-bold text-base text-right'>
                                {formatedDate(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.at) }
                               </Text>
                           </View>
                           <View>
                               <Text className='text-gray-500 font-bold text-base text-right'>
                                {formatedDate(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.at) }
                               </Text>
                           </View>
                        </View>

                        <View className='w-1/4 justify-center items-center'>
                       <View>
                           <Octicons name='dot-fill' size={24} color="red"/>
                       </View>
                       <View className='border-l-2 border-red-600 h-[70%]'></View>
                       <View>
                           <Octicons name='dot-fill' size={24} color="red"/>
                       </View>
                       <View className='border-l-2 border-red-600 h-[10%]'></View>
                    </View>
                    </View>

                    <View className='w-2/4 h-full justify-between'>
                       <View>
                          <Text className='font-bold text-base'>
                            {formatTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.at)}
                          </Text>
                          <Text className='text-base font-medium capitalize'>
                            {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.iataCode} Airport
                          </Text>
                       </View>

                       <View>
                          <Text className='font-bold text-base text-gray-500'>
                            {formatTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.businessName)} Airlines
                          </Text>
                          <Text className='font-bold text-base text-gray-500'>
                            {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.co2Emissions[0]?.cabin} M Class
                          </Text>
                       </View>

                       <View>
                          <Text className='font-bold text-base'>
                            {formatTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.at)}
                          </Text>
                          <Text className='text-base font-medium capitalize'>
                            {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.iataCode} Airport
                          </Text>
                       </View>
                    </View>
                    <View className='w-1/4 h-full justify-between'>
                      <View>
                        <Text className='text-base font-bold text-right'>
                          {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.carrierCode}
                        </Text>
                      </View>
                      <View>
                        <Text className='text-base font-bold text-right'>
                          {calculateDurationFlightTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.at, parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.at)}
                        </Text>
                      </View>
                    </View>
                </View>

                {/* Layover */}
                {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments?.length > 1 ? (
                  <View className='flex-row w-full justify-between'>
                     <Text className='text-base font-semibold'>Layover</Text>
                     <Text>
                     {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival?.iataCode} Airport
                     </Text>
                  </View>
                ) : null}
                {/* Second Flight Details */}
                {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments?.length > 1 ? (
                  <View className='py-2 flex-row justify-between items-start my-4 bg-white h-64 drop-shadow-sm px-4'>
                  <View className='w-1/4 justify-between h-full flex-row'>
                      <View className='h-full justify-between w-3/4 items-end'>
                         <View>
                             <Text className='text-gray-500 font-bold text-base text-right'>
                              {formatedDate(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.departure.at) }
                             </Text>
                         </View>
                         <View>
                             <Text className='text-gray-500 font-bold text-base text-right'>
                              {formatedDate(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.arrival.at) }
                             </Text>
                         </View>
                      </View>

                      <View className='w-1/4 justify-center items-center'>
                     <View>
                         <Octicons name='dot-fill' size={24} color="red"/>
                     </View>
                     <View className='border-l-2 border-red-600 h-[70%]'></View>
                     <View>
                         <Octicons name='dot' size={24} color="red"/>
                     </View>
                     <View className='border-l-2 border-red-600 h-[10%]'></View>
                  </View>
                  </View>

                  <View className='w-2/4 h-full justify-between'>
                     <View>
                        <Text className='font-bold text-base'>
                          {formatTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.departure.at)}
                        </Text>
                        <Text className='text-base font-medium capitalize'>
                          {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.departure.iataCode} Airport
                        </Text>
                     </View>

                     <View>
                        <Text className='font-bold text-base text-gray-500'>
                          {formatTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.businessName)} Airlines
                        </Text>
                        <Text className='font-bold text-base text-gray-500'>
                          {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.co2Emissions[0]?.cabin} M Class
                        </Text>
                     </View>

                     <View>
                        <Text className='font-bold text-base'>
                          {formatTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.arrival.at)}
                        </Text>
                        <Text className='text-base font-medium capitalize'>
                          {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.arrival.iataCode} Airport
                        </Text>
                     </View>
                  </View>
                  <View className='w-1/4 h-full justify-between'>
                    <View>
                      <Text className='text-base font-bold text-right'>
                        {parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.carrierCode}
                      </Text>
                    </View>
                    <View>
                      <Text className='text-base font-bold text-right'>
                        {calculateDurationFlightTime(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.departure.at, parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments[1]?.arrival.at)}
                      </Text>
                    </View>
                  </View>
              </View>
                ) : null}

                {/* Trip Total */}
                <View className='flex-row w-full justify-between py-8'>
                  <Text className='text-lg font-semibold'>Trip Total</Text>
                  <Text className='text-lg font-semibold'>
                    {calculateTripDuration(parsedFlightOfferPrice?.flightOffers[0]?.itineraries[0]?.segments)}
                  </Text>
                </View>
            </View>
            <View className='flex-row w-full justify-between bg-[#192031] py-4 px-4 items-center'>
              <Text className='text-white text-lg font-semibold'>
              {parsedFlightOfferPrice?.flightOffers[0]?.price?.currency === 'EUR' ? "€" : "$"}{' '}{Math.round(parsedFlightOfferPrice?.flightOffers[0]?.price?.total)}
              </Text>
              <Pressable 
                 onPress={()=>router.push({
                  pathname: '/travelerdetails',
                  params: {
                    FlightOfferPrice: JSON.stringify(parsedFlightOfferPrice)
                  }
                 })} 
                 className='bg-[#3182CE] rounded-full px-8 py-2 items-center justify-center'>
                   <Text className='text-white text-sm font-semibold'>Continue Booking</Text>
              </Pressable>
            </View>
           </ScrollView>
      </View>
    </View>
  )
}

export default FlightdetailsScreen

