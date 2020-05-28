import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import HomePage from './src/pages/HomePage'
// Modals
import BackdropCloseModal from './src/modals/BackdropCloseModal'
import BottomHalfModal from './src/modals/BottomHalfModal'
import CustomBackdropModal from './src/modals/CustomBackdropModal'
import DefaultModal from './src/modals/DefaultModal'
import WithoutCoverScreenModal from './src/modals/WithoutCoverScreenModal'
import FancyModal from './src/modals/FancyModal'
import ScrollableModal from './src/modals/ScrollableModal'
import SlideModal from './src/modals/SlideModal'
import SwipeableModal from './src/modals/SwipeableModal'
import SlowModal from './src/modals/SlowModal'
import WithoutBackdropModal from './src/modals/WithoutBackdropModal'

const Stack = createStackNavigator()
const RootStack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none" screenOptions={rootStackOptions}>
        <RootStack.Screen name="Home" component={MainStackScreen} />
        <RootStack.Screen name="BackdropCloseModal" component={BackdropCloseModal} />
        <RootStack.Screen name="BottomHalfModal" component={BottomHalfModal} />
        <RootStack.Screen name="CustomBackdropModal" component={CustomBackdropModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const MainStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  )
}

const rootStackOptions = {
  cardStyle: {backgroundColor: 'transparent'},
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
}

export default App
