import { cls } from '@/constants';
import { UserNotification, UserNotificationCategory } from '@/shared';
import React from 'react';
import { View } from 'react-native';
import { TTextLight, TTextLighter } from '../Themed';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/hooks';
import color from 'color';
import { formatDateFromNow } from '@/functions/date';

export default function NotificationCard(notification: UserNotification) {
    const { category, createdAt, message, body } = notification;

    return (
        <View className={`${cls.bg.opacified} rounded-xl mb-2 p-4`}>
            <View className="flex-row justify-between">
                {NoticicationCategoryIcon(category)}
                <TTextLighter className='opacity-70'>{formatDateFromNow(createdAt)}</TTextLighter>
            </View>
            <View>
                <TTextLight className='text-lg'>{message}</TTextLight>
                <TTextLighter className='text-sm'>{body}</TTextLighter>
            </View>
        </View>
    )
}

export function NoticicationCategoryIcon(category: UserNotificationCategory) {
    const { primary } = useAppTheme()
    const name = category == "message" ? "chatbubble"
        : category == "win" ? "medal"
            : category == "security" ? "warning"
                // : category == "loss" ? "medal"
                    : "information-circle"

    return <Ionicons name={name} size={20} color={color(primary).alpha(1).hexa()} />
}