import React, { Component } from 'react';
import {
  Dimensions,
  Modal,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  PanResponder,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  View,
  initializeRegistryWithDefinitions,
  registerAnimation,
  createAnimation,
} from 'react-native-animatable';
import * as ANIMATION_DEFINITIONS from './animations';

import styles from './index.style.js';

// Override default animations
initializeRegistryWithDefinitions(ANIMATION_DEFINITIONS);

// Utility for creating custom animations
const makeAnimation = (name, obj) => {
  registerAnimation(name, createAnimation(obj));
};

const isObject = obj => {
  return obj !== null && typeof obj === 'object';
};

const horizontalDirections = direction => {
  return direction == 'right' || direction == 'left';
}

export class ReactNativeModal extends Component {
  static propTypes = {
    animationIn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationInTiming: PropTypes.number,
    animationOut: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationOutTiming: PropTypes.number,
    avoidKeyboard: PropTypes.bool,
    backdropColor: PropTypes.string,
    backdropOpacity: PropTypes.number,
    backdropTransitionInTiming: PropTypes.number,
    backdropTransitionOutTiming: PropTypes.number,
    children: PropTypes.node.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onSwipe: PropTypes.func,
    onSwipeThreshold: PropTypes.number,
    useNativeDriver: PropTypes.bool,
    style: PropTypes.any,
    swipeDirection: PropTypes.string,
  };

  static defaultProps = {
    animationIn: 'slideInUp',
    animationInTiming: 300,
    animationOut: 'slideOutDown',
    animationOutTiming: 300,
    avoidKeyboard: false,
    backdropColor: 'black',
    backdropOpacity: 0.7,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
    onModalShow: () => null,
    onModalHide: () => null,
    isVisible: false,
    onBackdropPress: () => null,
    onBackButtonPress: () => null,
    onSwipe: () => null,
    onSwipeThreshold: 100,
    useNativeDriver: false,
    swipeDirection: null,
  };

  // We use an internal state for keeping track of the modal visibility: this allows us to keep
  // the modal visibile during the exit animation, even if the user has already change the
  // isVisible prop to false.
  // We also store in the state the device width and height so that we can update the modal on
  // device rotation.
  state = {
    isVisible: false,
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height,
    pan: new Animated.ValueXY(),
  };

  transitionLock = null;

  constructor(props) {
    super(props);
    this._buildAnimations(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isVisible && nextProps.isVisible) {
      this.setState({ isVisible: true });
    }
    if (
      this.props.animationIn !== nextProps.animationIn ||
      this.props.animationOut !== nextProps.animationOut
    ) {
      this._buildAnimations(nextProps);
    }
  }

  componentWillMount() {
    if (this.props.isVisible) {
      this.setState({ isVisible: true });
    }
    if (this.props.swipeDirection) {
      this._buildPanResponder(this.props);
    }
  }

  componentDidMount() {
    if (this.state.isVisible) {
      this._open();
    }
    DeviceEventEmitter.addListener('didUpdateDimensions', this._handleDimensionsUpdate);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('didUpdateDimensions', this._handleDimensionsUpdate);
  }

  componentDidUpdate(prevProps, prevState) {
    // On modal open request, we slide the view up and fade in the backdrop
    if (this.props.isVisible && !prevProps.isVisible) {
      this._open();
    }
    // On modal close request, we slide the view down and fade out the backdrop
    else if (!this.props.isVisible && prevProps.isVisible) {
      this._close();
    }
  }

  _buildPanResponder = props => {

    let animEvt = null;

    if ( horizontalDirections(this.props.swipeDirection) ) {
      animEvt = Animated.event([null,{
        dx : this.state.pan.x,
      }]);
    }
    else {
      animEvt = Animated.event([null,{
        dy : this.state.pan.y,
      }]);
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if ( this._isSwipeDirectionAllowed(gestureState) ) {
          this.backdropRef.transitionTo({ opacity: this.props.backdropOpacity * (1 - (this._getAccDistancePerDirection(gestureState) / this.state.deviceWidth))});
          animEvt(evt, gestureState);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this._getAccDistancePerDirection(gestureState) > this.props.onSwipeThreshold) {
          this.props.onSwipe();
          return;
        }

        this.backdropRef.transitionTo({ opacity: this.props.backdropOpacity });
        Animated.spring(
          this.state.pan,
          { toValue: {x: 0, y: 0} }
        ).start();
      }
    });
  }

  _getAccDistancePerDirection = gestureState => {
    switch (this.props.swipeDirection) {
      case 'top':
        return -gestureState.dy;
      case 'bottom':
        return gestureState.dy;
      case 'right':
        return gestureState.dx;
      case 'left':
        return -gestureState.dx;
      default:
        return 0;
    }
  }

  _isSwipeDirectionAllowed = ({dy, dx}) => {
    const draggedDown = dy > 0;
    const draggedUp = dy < 0;
    const draggedLeft = dx < 0;
    const draggedRight = dx > 0;

    switch (this.props.swipeDirection) {
      case 'top':
        if (draggedUp) return true;
        break;
      case 'bottom':
        if (draggedDown) return true;
        break;
      case 'right':
        if (draggedRight) return true;
        break;
      case 'left':
        if (draggedLeft) return true;
        break;
      default:
        return false;
    }

    return false;
  }

  // User can define custom react-native-animatable animations, see PR #72
  _buildAnimations = props => {
    let animationIn = props.animationIn;
    let animationOut = props.animationOut;

    if (isObject(animationIn)) {
      makeAnimation('animationIn', animationIn);
      animationIn = 'animationIn';
    }

    if (isObject(animationOut)) {
      makeAnimation('animationOut', animationOut);
      animationOut = 'animationOut';
    }

    this.animationIn = animationIn;
    this.animationOut = animationOut;
  };

  _handleDimensionsUpdate = dimensionsUpdate => {
    // Here we update the device dimensions in the state if the layout changed (triggering a render)
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    if (deviceWidth !== this.state.deviceWidth || deviceHeight !== this.state.deviceHeight) {
      this.setState({ deviceWidth, deviceHeight });
    }
  };

  _open = () => {
    if (this.transitionLock) return;
    this.transitionLock = true;
    this.backdropRef.transitionTo(
      { opacity: this.props.backdropOpacity },
      this.props.backdropTransitionInTiming,
    );

    // This is for reset the pan position, if not modal get stuck
    // at the last release position when you try to open it.
    // Could certainly be improve - no idea for the moment.
    this.state.pan.setValue({ x: 0, y: 0});

    this.contentRef[this.animationIn](this.props.animationInTiming).then(() => {
      this.transitionLock = false;
      if (!this.props.isVisible) {
        this._close();
      }
      else {
        this.props.onModalShow();
      }
    });
  };

  _close = () => {
    if (this.transitionLock) return;
    this.transitionLock = true;
    this.backdropRef.transitionTo({ opacity: 0 }, this.props.backdropTransitionOutTiming);
    this.contentRef[this.animationOut](this.props.animationOutTiming).then(() => {
      this.transitionLock = false;
      if (this.props.isVisible) {
        this._open();
      }
      else {
        this.setState({ isVisible: false });
        this.props.onModalHide();
      }
    });
  };

  render() {
    const {
      animationIn,
      animationInTiming,
      animationOut,
      animationOutTiming,
      avoidKeyboard,
      backdropColor,
      backdropOpacity,
      backdropTransitionInTiming,
      backdropTransitionOutTiming,
      children,
      isVisible,
      onModalShow,
      onBackdropPress,
      onBackButtonPress,
      useNativeDriver,
      style,
      ...otherProps
    } = this.props;
    const { deviceWidth, deviceHeight } = this.state;

    const computedStyle = [
      { margin: deviceWidth * 0.05, transform: [{ translateY: 0 }] },
      styles.content,
      style,
    ];

    const containerView = (
      <View
        { ...this.panResponder.panHandlers }
        ref={ref => (this.contentRef = ref)}
        style={[this.state.pan.getLayout(), computedStyle]}
        pointerEvents={'box-none'}
        useNativeDriver={useNativeDriver}
        onLayout={this._containerViewOnLayout}
        {...otherProps}
      >
        {children}
      </View>
    );

    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.isVisible}
        onRequestClose={onBackButtonPress}
        {...otherProps}
      >
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View
            ref={ref => (this.backdropRef = ref)}
            useNativeDriver={useNativeDriver}
            style={[
              styles.backdrop,
              {
                backgroundColor: backdropColor,
                width: deviceWidth,
                height: deviceHeight,
              },
            ]}
          />
        </TouchableWithoutFeedback>

          {avoidKeyboard && (
            <KeyboardAvoidingView
              behavior={'padding'}
              pointerEvents={'box-none'}
              style={computedStyle.concat([{ margin: 0 }])}
            >
              {containerView}
            </KeyboardAvoidingView>
          )}

          {!avoidKeyboard && containerView}
      </Modal>
    );
  }
}

export default ReactNativeModal;