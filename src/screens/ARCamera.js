import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const ARCamera = () => {
  return (
    <WebView
      useWebKit
      originWhitelist={['*']}
      allowsInlineMediaPlayback
      source={{ uri: 'https://musear.kraker.works'}}
      style={{ width: '100%', height: '100%'}}
    />
  )
}

export default ARCamera