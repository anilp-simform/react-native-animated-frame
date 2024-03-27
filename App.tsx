/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import Frame from './App/components/Frame';
import Shade from './App/components/Shade';
import LoadingCamera from './App/components/LoadingCamera';

function App(): React.JSX.Element {
  const checkPermission = () => {
    check(PERMISSIONS.IOS.CAMERA).then(result => {
      console.log({result});
      if (result !== RESULTS.GRANTED) {
        request(PERMISSIONS.IOS.CAMERA);
      }
    });
  };
  useEffect(checkPermission);

  const [cameraLoaded, setCameraLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setCameraLoad(false), 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {/* {cameraLoaded ? (
          <LoadingCamera />
        ) : ( */}
          <>
            <Shade />
            <Frame />
          </>
        {/* )} */}
      </View>
      <TouchableOpacity activeOpacity={0.9} style={styles.buttonOuterContainer}>
        <View style={styles.buttonInnerContainer} />
      </TouchableOpacity>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor:'grey'},
  buttonOuterContainer: {
    position: 'absolute',
    bottom: 50,
    height: 60,
    alignSelf: 'center',
    width: 60,
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonInnerContainer: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 13,
  },
});
