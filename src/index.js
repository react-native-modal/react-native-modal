import React, { Component } from 'react';
import {
  Dimensions,
  Modal,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
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
    useNativeDriver: PropTypes.bool,
    style: PropTypes.any,
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
    useNativeDriver: false,
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
        ref={ref => (this.contentRef = ref)}
        style={computedStyle}
        pointerEvents={'box-none'}
        useNativeDriver={useNativeDriver}
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
