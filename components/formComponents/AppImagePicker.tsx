import { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppButton } from '../ui';
import { TTextLighter } from '../Themed';
import { Ionicons } from '@expo/vector-icons';

export type AppImagePickerProps = {
    src?: string;
    onSelect: (value: string, deleted?: boolean) => void;
}

export function AppImagePicker({ onSelect, src }: AppImagePickerProps) {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            quality: 0.7,
        });

        // console.log(result);

        if (!result.canceled) {
            const img = result.assets[0].uri;
            setImage(img);
            onSelect?.(img);
        }
    };

    return (
        <View className=' justify-center items-center py-4' >
            <AppButton onPress={pickImage} className={"rounded-lg overflow-hidden bg-darkGrey/50 dark:bg-lightGrey/50 h-60 w-60 justify-center items-center relative"}>
                {image ? <Image source={{ uri: image }} className='h-full w-full' />
                    : src ? <Image source={{ uri: src }} className='h-full w-full' />
                        : <TTextLighter>tap to select photo</TTextLighter>
                }
                {(image || src) && <AppButton
                    onPress={() => {
                        setImage(null);
                        onSelect?.("", true);
                    }}
                    className={"bg-red-300 rounded-lg absolute bottom-4 right-4 p-2"}>
                    <Ionicons name='trash' color={"#cc2323"} size={24} />
                </AppButton>}
            </AppButton>
        </View>
    );
}

