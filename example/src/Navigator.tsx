import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import BackdropCloseModal from './modals/BackdropCloseModal';
import BottomHalfModal from './modals/BottomHalfModal';
import CustomBackdropModal from './modals/CustomBackdropModal';
import DefaultModal from './modals/DefaultModal';
import WithoutCoverScreenModal from './modals/WithoutCoverScreenModal';
import FancyModal from './modals/FancyModal';
import ScrollableModal from './modals/ScrollableModal';
import SlideModal from './modals/SlideModal';
import SwipeableModal from './modals/SwipeableModal';
import SlowModal from './modals/SlowModal';
import WithoutBackdropModal from './modals/WithoutBackdropModal';
import {Animated, Easing} from 'react-native';

const StackNavigator = createNativeStackNavigator();

const components = {
  Home: HomePage,
  BackdropCloseModal: BackdropCloseModal,
  BottomHalfModal: BottomHalfModal,
  CustomBackdropModal: CustomBackdropModal,
  DefaultModal: DefaultModal,
  FancyModal: FancyModal,
  ScrollableModal: ScrollableModal,
  SlideModal: SlideModal,
  SlowModal: SlowModal,
  SwipeableModal: SwipeableModal,
  WithoutCoverScreenModal: WithoutCoverScreenModal,
  WithoutBackdropModal: WithoutBackdropModal,
};

const config = {
  initialRouteName: 'Home',
};

export default function Navigator() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        {...config}
        screenOptions={
          {
            transitionSpec: {
              duration: 300,
              easing: Easing.out(Easing.poly(5)),
              timing: Animated.timing,
              useNativeDriver: true,
            },
            cardStyleInterpolator: (sceneProps: any) => {
              const {layout, position, scene} = sceneProps;

              const thisSceneIndex = scene.index;
              const width = layout.initWidth;

              const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
              });

              return {transform: [{translateX}]};
            },
          } as any
        }>
        {Object.entries(components).map(([name, component]) => {
          return (
            <StackNavigator.Screen
              key={name}
              name={name}
              component={component}
            />
          );
        })}
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
