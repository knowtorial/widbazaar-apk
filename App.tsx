/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
import { WebView } from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
import FadingLoader from './src/screens/FadingLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


const getToken = async () => {
  const token = await messaging().getToken()
  console.log(token)
  // Clipboard.setString(token);
}


function App(): React.JSX.Element {
  useEffect(() => {
    const checkIfTokenReceived = async () => {
      // Check if the flag is set in AsyncStorage
      const hasRunBefore = await AsyncStorage.getItem('hasRunBefore');

      if (!hasRunBefore) {
        // If not, run getToken and set the flag
        await getToken();
        await AsyncStorage.setItem('hasRunBefore', 'true');
      }
    };

    // Run the checkIfTokenReceived function when the component mounts
    checkIfTokenReceived();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [runOnce, setRunOnce] = useState(true)

  return (
    <View style={styles.container}>
      {/* WebView */}
      <WebView
        source={{
          uri: 'https://www.widbazaar.com/',
        }}
        startInLoadingState={true}
        scalesPageToFit={true}
        onLoadEnd={() => { setIsLoading(false) }}
        style={styles.webView}
      />

      {/* FadingLoader */}
      {isLoading || runOnce ? <FadingLoader setRunOnce={setRunOnce} /> : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default App;
