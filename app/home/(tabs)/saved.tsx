import { AppScaffold } from '@/components/layout'
import React, { useState } from 'react'
import { View } from 'react-native'

export default function Explore() {
  const [refreshing, setRefreshing] = useState(false); // Add state for refreshing
  const [league, setLeague] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here
    // Simulate a refresh with a timeout
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <AppScaffold
      refreshing={refreshing}
      onRefresh={onRefresh}
      title={"Open Skirms"
      }
      hideBack
      underAppbar={<View className="mx-4 flex-row items-center">
        {/* <AppSelect
          label="Select Category"
          options={availableLeagues}
          value={availableLeagues[0]}
          scrollable
          snapPoints={['50%', '60%']}
          renderButton={(v) => {
            setLeague(v.value)
            return <AppButton className={`${cls.btn.selectClass}`}>
              <TText>{v.title}</TText>
            </AppButton>
          }}
        /> */}
      </View>}
    >
    </AppScaffold>
  )
}