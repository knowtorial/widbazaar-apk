/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { WebView } from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


const getToken = async () => {
  const token = await messaging().getToken()
  console.log(token)
}


function App(): React.JSX.Element {
  useEffect(() => { getToken() })
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'stretch' }}>
      <WebView
        source={{
          uri: 'https://www.widbazaar.com/',
        }}
        startInLoadingState={true}
        scalesPageToFit={true}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
}

export default App;
