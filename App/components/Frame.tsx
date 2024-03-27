import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import constant from '../constant';
const defaultOffset = constant.AREA_HEIGHT / 2;
const duration = 2000;

/**
 * Moving line and outline frame for the area
 * @returns component frame for camera
 */
export default function Frame() {
  const margin = useSharedValue(15);
  const offset = useSharedValue(0);
  const [showDummyPage, setShowDummy] = useState(false);
  const animatedTransformStyles = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));
  const animatedStyles = useAnimatedStyle(() => ({
    height: constant.AREA_HEIGHT * 0.95 + margin.value,
    width: constant.AREA_WIDTH * 0.9 + margin.value,
  }));
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: offset.value === 0 ? 0 : 1,
  }));

  React.useEffect(() => {
    setTimeout(() => {
      margin.value = withRepeat(
        withSequence(
          withTiming(-margin.value, {duration}),
          withTiming(margin.value, {duration}),
        ),
        -1,
      );
      offset.value = withRepeat(
        withSequence(
          withTiming(defaultOffset, {duration, easing: Easing.linear}),
          withTiming(-defaultOffset, {duration, easing: Easing.linear}),
        ),
        -1,
        true,
      );
    }, 2500);

    setTimeout(() => {
      setShowDummy(true);
    }, 4000);
    setTimeout(() => {
      setShowDummy(false);
    }, 6000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.containerCenter}>
        <Animated.View
          style={[styles.container, animatedStyles, opacityStyles]}>
          <View style={styles.row}>
            <View style={[styles.box, styles.rotateY]} />
            <View style={styles.box} />
          </View>
          <View style={styles.row}>
            <View style={[styles.box, styles.rotate]} />
            <View style={[styles.box, styles.rotateX]} />
          </View>
        </Animated.View>
        <View style={styles.lineContainer}>
          <Animated.View
            style={[styles.line, animatedTransformStyles, opacityStyles]}
          />
        </View>
        {showDummyPage && (
          <Image
            resizeMode="contain"
            source={require('../assets/scan_image.png')}
            style={{
              height: constant.AREA_HEIGHT,
              width: constant.AREA_WIDTH * 0.9,
              position: 'absolute',
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'space-between',
  },
  rotateX: {transform: [{rotateX: '180deg'}]},
  rotateY: {transform: [{rotateY: '180deg'}]},
  rotate: {transform: [{rotate: '180deg'}]},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  box: {
    height: 70,
    width: 40,
    borderTopColor: 'white',
    borderTopWidth: 3,
    borderRightColor: 'white',
    borderRightWidth: 3,
  },
  lineContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
  },
  line: {
    height: 1,
    width: constant.AREA_WIDTH,
    borderColor: 'red',
    borderWidth: 1,
  },
});
