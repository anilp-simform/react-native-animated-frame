import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const defaultOffset = 150;
const duration = 800;

export default function Detecting() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(defaultOffset, {duration, easing: Easing.cubic}),
        withTiming(0, {duration, easing: Easing.cubic}),
        withTiming(-defaultOffset, {duration, easing: Easing.cubic}),
      ),
      -1,
      true,
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  box: {
    height: 1,
    width: 350,
    borderColor: '#b58df1',
    borderWidth: 2,
  },
});
