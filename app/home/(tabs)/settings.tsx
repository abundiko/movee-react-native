import { AppScaffold } from '@/components/layout'
import { SettingsList } from '@/components/settings'
import React from 'react'


export default function Profile() {

  return (
    <AppScaffold
      title='Settings'
      hideBack
      noScroll
    >
      <SettingsList />
    </AppScaffold>
  )
}