import React from 'react'
import {Button, StyleSheet, View} from 'react-native'

const HomePage = ({navigation}) => {
  return (
    <View style={styles.view}>
      <Button
        testID={'backdrop-close-modal-open-button'}
        title={'Close on Backdrop Press'}
        onPress={() => navigation.navigate('BackdropCloseModal')}
      />
      <Button
        testID={'custom-backdrop-modal-open-button'}
        title={'Custom Backdrop'}
        onPress={() => navigation.navigate('CustomBackdropModal')}
      />
      <Button
        testID={'bottom-half-modal-open-button'}
        title={'Bottom-Half'}
        onPress={() => navigation.navigate('BottomHalfModal')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomePage
