import { Dimensions, StyleSheet } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

export default StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    opacity: 0,
    backgroundColor: 'black'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    margin: DEVICE_WIDTH * 0.05
  }
})
