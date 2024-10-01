import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

export default function CountryFlag(props: {country:string}) {
    
    return (
        <View className='rounded overflow-hidden aspect-[2/1] w-12  '>
            <WebView 
            scalesPageToFit={false}
            source={{ uri: `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${props.country}.svg` }} 
            className='h-full w-full' />
        </View>
    )
}