import { AppScaffold } from '@/components/layout'
import { LogoutButton, ProfileList, ProfileTile } from '@/components/profile'
import React from 'react'
import { View } from 'react-native'


export default function Profile() {

  return (
    <AppScaffold
      title='Profile'
      hideBack
      noScroll
    >
      <ProfileTile />
      <ProfileList />
      <View className="absolute bottom-32 justify-center w-full flex-row">
        <LogoutButton />
      </View>
    </AppScaffold>
  )
}