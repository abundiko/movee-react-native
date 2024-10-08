
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { AnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function AppButton({ style = {}, onPressIn, disabled, onPressOut, className, ...props }: PressableProps & AnimatedProps<PressableProps>) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const btnStyle = useAnimatedStyle(() => ({ opacity: disabled ? .5 : opacity.value, transform: [{ scale: scale.value }] }))

  return (
    <AnimatedPressable {...props}
      style={[btnStyle, style]}
      disabled={disabled}
      onPressIn={(p) => {
        if (onPressIn) onPressIn(p)
        opacity.value = withSpring(0.5);
        scale.value = withSpring(0.95);
      }}
      onPressOut={(p) => {
        if (onPressOut) onPressOut(p)
        opacity.value = withSpring(1);
        scale.value = withSpring(1);
      }}
      className={className}
    />
  )
}