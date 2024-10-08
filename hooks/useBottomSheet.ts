import { useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export function useBottomSheet(){
    
    const ref = useRef<BottomSheetModal>(null);
    function openModal() {
        ref.current?.present();
    }

    function closeModal() {
        ref.current?.dismiss();
    }

    return { ref, openModal, closeModal }
}
