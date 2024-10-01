import { NameAndUrl } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Linking, Text } from 'react-native'
import { AppButton } from '../ui'

export default function ReferenceButton({name, url}:NameAndUrl) {
    
  return (
    <AppButton
    onPress={()=>{
        Linking.openURL(url)
    }}
     className={"bg-blue-100 py-2.5 border-transparent mr-2 mb-2 flex-row rounded-lg px-4"}>
      <Text className='mr-2 text-black'>{name}</Text>
      <Ionicons name='link' color={'black'} size={20} />
    </AppButton>
  )
}