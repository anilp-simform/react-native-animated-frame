import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import constant from '../constant';

/**
 * Component that generate the shadow over camera or any other component,
 * @returns component with specific window cut that not have shadow
 */
export default function Shade() {
  const offsetWidth = useSharedValue(0);
  const offsetHeight = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    width: offsetWidth.value,
  }));
  const animatedHeightStyles = useAnimatedStyle(() => ({
    height: offsetHeight.value,
    width: offsetWidth.value,
  }));
  React.useEffect(() => {
    offsetHeight.value = withTiming(constant.AREA_HEIGHT, {duration: 2000});
    offsetWidth.value = withTiming(constant.AREA_WIDTH, {duration: 2000});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.containerCenter}>
      <View style={styles.shadeBox} />
      <View style={styles.row}>
        <Animated.View
          style={[styles.sideBox, styles.shadeBox, animatedHeightStyles]}
        />
        <Animated.View style={[styles.container, animatedStyles]} />
        <Animated.View
          style={[styles.sideBox, styles.shadeBox, animatedHeightStyles]}
        />
      </View>
      <View style={styles.shadeBox} />
      <Text style={styles.title}>Document Scanner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideBox: {
    flex: 1,
    height: 400,
  },
  shadeBox: {
    flex: 1,
    width: '100%',
    backgroundColor: '#00000060',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    position: 'absolute',
    textAlign: 'center',
    top: 60,
    color: 'white',
    left: 0,
    right: 0,
  },
  container: {
    width: 250,
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
});
