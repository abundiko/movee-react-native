import { UserNotification } from '@/shared'
import React from 'react'
import NotificationCard from './NotificationCard'
import { View } from 'react-native'

export default function Notifications({ notifications }: {
    notifications: UserNotification[]
}) {
    return (
        <View className='mx-4'>
            {
                notifications.map((notification, i)=>(
                    <NotificationCard key={i} {...notification} />
                ))
            }
        </View>
    )
}