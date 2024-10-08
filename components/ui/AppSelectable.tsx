import React from 'react'
import { TouchableHighlight, TouchableHighlightProps } from 'react-native-gesture-handler'
import { cls } from '@/constants'
import { TTextLighter } from '../Themed'

export default function AppSelectable({
    children, selected, className, ...others
}: TouchableHighlightProps & {
    selected?: boolean;
}) {
    return (
        <TouchableHighlight
            {...others}
            className={`${cls.bg.opacified} ${className} py-3 px-6 rounded-lg border mr-3 mb-3 ${selected && 'border-primary'}`}
        >
            {typeof children === 'string' ? <TTextLighter>
                {children}
            </TTextLighter> : children}
        </TouchableHighlight>
    )
}