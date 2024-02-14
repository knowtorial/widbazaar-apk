/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
function App(): React.JSX.Element {
  return (
    <View style={{flex: 1, alignItems: 'stretch'}}>
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
