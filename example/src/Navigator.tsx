import {createAppContainer, NavigationScreenComponent} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {SceneInterpolatorProps} from 'react-navigation-stack/lib/typescript/types';
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

const makeScene = (screen: NavigationScreenComponent<any, any>) => ({screen});

const StackNavigator = createStackNavigator(
  {
    Home: makeScene(HomePage),
    BackdropCloseModal: makeScene(BackdropCloseModal),
    BottomHalfModal: makeScene(BottomHalfModal),
    CustomBackdropModal: makeScene(CustomBackdropModal),
    DefaultModal: makeScene(DefaultModal),
    FancyModal: makeScene(FancyModal),
    ScrollableModal: makeScene(ScrollableModal),
    SlideModal: makeScene(SlideModal),
    SlowModal: makeScene(SlowModal),
    SwipeableModal: makeScene(SwipeableModal),
    WithoutCoverScreenModal: makeScene(WithoutCoverScreenModal),
    WithoutBackdropModal: makeScene(WithoutBackdropModal),
  },
  {
    initialRouteName: 'Home',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(5)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps: SceneInterpolatorProps) => {
        const {layout, position, scene} = sceneProps;

        const thisSceneIndex = scene.index;
        const width = layout.initWidth;

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        });

        return {transform: [{translateX}]};
      },
    }),
  },
);

export default createAppContainer(StackNavigator);
