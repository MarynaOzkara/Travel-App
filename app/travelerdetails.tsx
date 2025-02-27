import { View, Text, Pressable, ScrollView, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {Formik} from 'formik';
import * as Yup from "yup"
import TextInputField from '@/components/TextInputField'
import DatePickerFields from '@/components/DatePickerFields'


const TravelerdetailsScreen = () => {
  const [selectedGender, setSelectedGender] = useState('MALES');
  const [selectedCountry, setSelectedCountry] = useState('EE');
  const [selectedLocation, setSelectedLocation] = useState('Tallinn');
  const [selectedNationality, setSelectedNationality] = useState('EE');
  const [selectedBirthPlace, setSelectedBirthPlace] = useState('Tallinn');
  const [selectedPurpose, setSelectedPurpose] = useState('Standard');
  const validationSchema = Yup.object().shape ({
    
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    name: Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
    }),
    documents: Yup.array().of(
      Yup.object().shape({
        number: Yup.string().required('Document Number is required'),
        issuanseDate: Yup.string().required('Issuanse Date is required'),
        expiryDate: Yup.string().required('Expiry Date is required'),
        issuanceCountry: Yup.string().required('Issuance Country is required'),
        issuanceLocation: Yup.string().required('Issuance Location is required'),
        birthPlace: Yup.string().required('Birth Place is required'),
        holder: Yup.boolean().required('Holder is required'),
        
      }),
      
    ),
    contact: Yup.object().shape({
      purpose: Yup.string().required('Purpose is required'),
      phones: Yup.array().of(
        Yup.object().shape({
          
          countryCallingCode:  Yup.string().required('Country Calling Code is required'),
          number: Yup.string().required('Number is required'),
        })
      ),
      emailAddress: Yup.string().email("Invalid Email").required('Email Address is required'),
    }),
    
  })
  const formatDate = (date: any)=>{
    return date.toISOString().split('T')[0]
  }
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
                      <Text className="text-lg text-white font-extrabold">Traveler Details</Text>
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200
        }}
      >
        <View className='flex-1 items-center bg-[#f5f7fa] w-full'>
          <Formik
            initialValues={{
              id: '',
              dateOfBirth: new Date(2024, 3, 14),
              gender: selectedGender,
              name: {
                firstName: '',
                lastName: ''
              },
              documents: 
              [
                {
                  number: '',
                  issuanseDate: new Date(2024, 3, 14),
                  expiryDate: new Date(2024, 3, 14),
                  issuanceCountry: selectedCountry,
                  issuanceLocation: selectedLocation,
                  nationality: selectedNationality,
                  birthPlace: selectedBirthPlace,
                  documentType: '',
                  holder: true
                }
              ],
              contact: {
                purpose: selectedPurpose,
                phones: [
                  {
                    deviceType: "MOBILE",
                    countryCallingCode: "",
                    number: ""
                  }
                ],
                emailAddress: ''
              }
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const convertedData = {
                ...values, 
                id: 1, 
                gender: selectedGender,
                dateOfBirth: formatDate(values.dateOfBirth),
                documents: values.documents.map((doc: any) =>({
                  ...doc,
                  issuanseDate: formatDate(doc.issuanseDate),
                  expiryDate: formatDate(doc.expiryDate)

                }) )
              }
            }}
          >
            {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
              <View className='w-full px-4 py-4'>
                {/* Phone number */}
                <TextInputField
                   label="Phone number"
                   value={values.contact.phones[0].number}
                   onChangeText={handleChange("contact.phones[0].number")}
                   placeholder="Enter Phone Number"
                   error={errors.contact && errors.contact?.phones?.[0]?.number}
                />
                {/* Email */}
                <TextInputField
                   label="Email"
                   value={values.contact.emailAddress}
                   onChangeText={handleChange("contact.emailAddress")}
                   placeholder="Enter Email"
                   error={errors.contact && errors.contact.emailAddress}
                />
                {/* Date of Birth */}
                <DatePickerFields
                  label="Date of Birth"
                  value={values.dateOfBirth}
                  onChange={(date: any)=>setFieldValue("dateOgBirth", date)}
                  error={errors.dateOfBirth}
                />
                {/* First Name */}
                <TextInputField
                   label="First Name"
                   value={values.name.firstName}
                   onChangeText={handleChange("name.firstName")}
                   placeholder="First Name"
                   error={errors.name && errors.name.firstName}
                />
                {/* Last Name */}
                <TextInputField
                   label="Last Name"
                   value={values.name.lastName}
                   onChangeText={handleChange("name.lastName")}
                   placeholder="Last Name"
                   error={errors.name && errors.name.lastName}
                />
                {/* Document section */}
                <View className='w-full pb-4'>
                  <Text className='text-xl font-bold text-gray-700'>Document section</Text>
                </View>
                {/* Document number */}
                <TextInputField
                   label="Document number"
                   value={values.documents[0].number}
                   onChangeText={handleChange("documents[0].number")}
                   placeholder="Enter Document Number"
                   error={errors.contact && errors.documents?.[0]?.number}
                />
                {/*Contacts */}
                <View className='w-full pb-4'>
                  <Text className='text-xl font-bold text-gray-700'>Contacts</Text>
                </View>
                {/* Country Calling Code */}
                <TextInputField
                   label="Country Calling Code"
                   value={values.contact.phones[0].countryCallingCode}
                   onChangeText={handleChange("contact.phones[0].countryCallingCode")}
                   placeholder="Enter Country Calling Code"
                   error={errors.contact && errors.contact?.phones?.[0]?.countryCallingCode}
                />

                <View className='flex-row items-center gap-2'>
                  <Text className='text-base font-semibold pr-2'>Are you the holder of the passport?</Text>
                  <Switch value={values.documents[0].holder}/>
                </View>
                {/* Submit button */}
                <View className='w-full justify-start pt-8'>
                   <Pressable onPress={()=>handleSubmit()} className='bg-[#3182CE] rounded-lg justify-center items-center py-4'>
                    <Text className='text-white font-bold text-lg'>Submit</Text>
                   </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      </View> 
    </View>
  )
}

export default TravelerdetailsScreen