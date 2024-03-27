import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';

const duration = 2000;

export default function LoadingCamera() {
  const sv = useSharedValue(0);

  React.useEffect(() => {
    // highlight-next-line
    sv.value = withRepeat(withTiming(1, {duration, easing: Easing.linear}), 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${sv.value * 360}deg`}],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        {/* Children */}
      </Animated.View>
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
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
});
