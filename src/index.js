import React, { Component } from "react";
import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import * as animatable from "react-native-animatable";
import { initializeAnimations, buildAnimations } from "./utils";

import styles from "./index.style.js";

// Override default react-native-animatable animations
initializeAnimations();

class ReactNativeModal extends Component {
  static propTypes = {
    animationIn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationInTiming: PropTypes.number,
    animationOut: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationOutTiming: PropTypes.number,
    avoidKeyboard: PropTypes.bool,
    hasBackdrop: PropTypes.bool,
    backdropColor: PropTypes.string,
    backdropOpacity: PropTypes.number,
    backdropTransitionInTiming: PropTypes.number,
    backdropTransitionOutTiming: PropTypes.number,
    children: PropTypes.node.isRequired,
    deviceHeight: PropTypes.number,
    deviceWidth: PropTypes.number,
    isVisible: PropTypes.bool.isRequired,
    hideModalContentWhileAnimating: PropTypes.bool,
    propagateSwipe: PropTypes.bool,
    onModalShow: PropTypes.func,
    onModalWillShow: PropTypes.func,
    onModalHide: PropTypes.func,
    onModalWillHide: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onSwipeStart: PropTypes.func,
    onSwipeMove: PropTypes.func,
    onSwipeComplete: PropTypes.func,
    onSwipeCancel: PropTypes.func,
    swipeThreshold: PropTypes.number,
    swipeDirection: PropTypes.oneOf(["up", "down", "left", "right"]),
    useNativeDriver: PropTypes.bool,
    style: PropTypes.any,
    scrollTo: PropTypes.func,
    scrollOffset: PropTypes.number,
    scrollOffsetMax: PropTypes.number,
    supportedOrientations: PropTypes.arrayOf(
      PropTypes.oneOf([
        "portrait",
        "portrait-upside-down",
        "landscape",
        "landscape-left",
        "landscape-right"
      ])
    )
  };

  static defaultProps = {
    animationIn: "slideInUp",
    animationInTiming: 300,
    animationOut: "slideOutDown",
    animationOutTiming: 300,
    avoidKeyboard: false,
    hasBackdrop: true,
    backdropColor: "black",
    backdropOpacity: 0.7,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
    onModalShow: () => null,
    onModalWillShow: () => null,
    deviceHeight: null,
    deviceWidth: null,
    onModalHide: () => null,
    onModalWillHide: () => null,
    isVisible: false,
    hideModalContentWhileAnimating: false,
    propagateSwipe: PropTypes.false,
    onBackdropPress: () => null,
    onBackButtonPress: () => null,
    swipeThreshold: 100,
    useNativeDriver: false,
    scrollTo: null,
    scrollOffset: 0,
    scrollOffsetMax: 0,
    supportedOrientations: ["portrait", "landscape"]
  };

  // We use an internal state for keeping track of the modal visibility: this allows us to keep
  // the modal visibile during the exit animation, even if the user has already change the
  // isVisible prop to false.
  // We store in the state the device width and height so that we can update the modal on
  // device rotation.
  state = {
    showContent: true,
    isVisible: false,
    deviceWidth: Dimensions.get("window").width,
    deviceHeight: Dimensions.get("window").height,
    isSwipeable: this.props.swipeDirection ? true : false,
    pan: null
  };

  isTransitioning = false;
  inSwipeClosingState = false;

  constructor(props) {
    super(props);
    const { animationIn, animationOut } = buildAnimations(props);
    this.animationIn = animationIn;
    this.animationOut = animationOut;
    if (this.state.isSwipeable) {
      this.state = { ...this.state, pan: new Animated.ValueXY() };
      this.buildPanResponder();
    }
    if (this.props.isVisible) {
      this.state = {
        ...this.state,
        isVisible: true,
        showContent: true
      };
    }
  }

  // TODO: Stop using componentWillReceiveProps
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.state.isVisible && nextProps.isVisible) {
      this.setState({ isVisible: true, showContent: true });
    }
    if (
      this.props.animationIn !== nextProps.animationIn ||
      this.props.animationOut !== nextProps.animationOut
    ) {
      const { animationIn, animationOut } = buildAnimations(nextProps);
      this.animationIn = animationIn;
      this.animationOut = animationOut;
    }
    if (
      this.props.backdropOpacity !== nextProps.backdropOpacity &&
      this.backdropRef
    ) {
      this.backdropRef.transitionTo(
        { opacity: nextProps.backdropOpacity },
        this.props.backdropTransitionInTiming
      );
    }
  }

  componentDidMount() {
    // Show deprecation message
    if (this.props.onSwipe) {
      console.warn(
        '`<Modal onSwipe="..." />` is deprecated. Use `<Modal onSwipeComplete="..." />` instead.'
      );
    }
    if (this.state.isVisible) {
      this.open();
    }
    DeviceEventEmitter.addListener(
      "didUpdateDimensions",
      this.handleDimensionsUpdate
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener(
      "didUpdateDimensions",
      this.handleDimensionsUpdate
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // On modal open request, we slide the view up and fade in the backdrop
    if (this.props.isVisible && !prevProps.isVisible) {
      this.open();
    } else if (!this.props.isVisible && prevProps.isVisible) {
      // On modal close request, we slide the view down and fade out the backdrop
      this.close();
    }
  }

  buildPanResponder = () => {
    let animEvt = null;

    if (
      this.props.swipeDirection === "right" ||
      this.props.swipeDirection === "left"
    ) {
      animEvt = Animated.event([null, { dx: this.state.pan.x }]);
    } else {
      animEvt = Animated.event([null, { dy: this.state.pan.y }]);
    }

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Use propagateSwipe to allow inner content to scroll. See PR:
        // https://github.com/react-native-community/react-native-modal/pull/246
        if (!this.props.propagateSwipe) {
          // The number "4" is just a good tradeoff to make the panResponder
          // work correctly even when the modal has touchable buttons.
          // For reference:
          // https://github.com/react-native-community/react-native-modal/pull/197
          const shouldSetPanResponder =
            Math.abs(gestureState.dx) >= 4 || Math.abs(gestureState.dy) >= 4;
          if (shouldSetPanResponder && this.props.onSwipeStart) {
            this.props.onSwipeStart();
          }
          return shouldSetPanResponder;
        }
      },
      onStartShouldSetPanResponder: () => {
        if (this.props.scrollTo && this.props.scrollOffset > 0) {
          return false; // user needs to be able to scroll content back up
        }
        if (this.props.onSwipeStart) {
          this.props.onSwipeStart();
        }
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Dim the background while swiping the modal
        const deviceWidth = this.props.deviceWidth || this.state.deviceWidth;
        const accDistance = this.getAccDistancePerDirection(gestureState);
        const newOpacityFactor = 1 - accDistance / deviceWidth;
        if (this.isSwipeDirectionAllowed(gestureState)) {
          this.backdropRef &&
            this.backdropRef.transitionTo({
              opacity: this.props.backdropOpacity * newOpacityFactor
            });
          animEvt(evt, gestureState);
          if (this.props.onSwipeMove) {
            this.props.onSwipeMove(newOpacityFactor);
          }
        } else {
          if (this.props.scrollTo) {
            let offsetY = -gestureState.dy;
            if (offsetY > this.props.scrollOffsetMax) {
              offsetY -= (offsetY - this.props.scrollOffsetMax) / 2;
            }
            this.props.scrollTo({ y: offsetY, animated: false });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Call the onSwipe prop if the threshold has been exceeded
        const accDistance = this.getAccDistancePerDirection(gestureState);
        if (accDistance > this.props.swipeThreshold) {
          if (this.props.onSwipeComplete) {
            this.inSwipeClosingState = true;
            this.props.onSwipeComplete();
            return;
          }
          // Deprecated. Remove later.
          if (this.props.onSwipe) {
            this.inSwipeClosingState = true;
            this.props.onSwipe();
            return;
          }
        }
        //Reset backdrop opacity and modal position
        if (this.props.onSwipeCancel) {
          this.props.onSwipeCancel();
        }
        if (this.backdropRef) {
          this.backdropRef.transitionTo(
            { opacity: this.props.backdropOpacity },
            this.props.backdropTransitionInTiming
          );
        }
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          bounciness: 0
        }).start();
        if (this.props.scrollOffset > this.props.scrollOffsetMax) {
          this.props.scrollTo({
            y: this.props.scrollOffsetMax,
            animated: true
          });
        }
      }
    });
  };

  getAccDistancePerDirection = gestureState => {
    switch (this.props.swipeDirection) {
      case "up":
        return -gestureState.dy;
      case "down":
        return gestureState.dy;
      case "right":
        return gestureState.dx;
      case "left":
        return -gestureState.dx;
      default:
        return 0;
    }
  };

  isSwipeDirectionAllowed = ({ dy, dx }) => {
    const draggedDown = dy > 0;
    const draggedUp = dy < 0;
    const draggedLeft = dx < 0;
    const draggedRight = dx > 0;

    if (this.props.swipeDirection === "up" && draggedUp) {
      return true;
    } else if (this.props.swipeDirection === "down" && draggedDown) {
      return true;
    } else if (this.props.swipeDirection === "right" && draggedRight) {
      return true;
    } else if (this.props.swipeDirection === "left" && draggedLeft) {
      return true;
    }
    return false;
  };

  handleDimensionsUpdate = dimensionsUpdate => {
    if (!this.props.deviceHeight && !this.props.deviceWidth) {
      // Here we update the device dimensions in the state if the layout changed
      // (triggering a render)
      const deviceWidth = Dimensions.get("window").width;
      const deviceHeight = Dimensions.get("window").height;
      if (
        deviceWidth !== this.state.deviceWidth ||
        deviceHeight !== this.state.deviceHeight
      ) {
        this.setState({ deviceWidth, deviceHeight });
      }
    }
  };

  open = () => {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    if (this.backdropRef) {
      this.backdropRef.transitionTo(
        { opacity: this.props.backdropOpacity },
        this.props.backdropTransitionInTiming
      );
    }

    // This is for resetting the pan position,otherwise the modal gets stuck
    // at the last released position when you try to open it.
    // TODO: Could certainly be improved - no idea for the moment.
    if (this.state.isSwipeable) {
      this.state.pan.setValue({ x: 0, y: 0 });
    }

    if (this.contentRef) {
      this.props.onModalWillShow && this.props.onModalWillShow();
      this.contentRef[this.animationIn](this.props.animationInTiming).then(
        () => {
          this.isTransitioning = false;
          if (!this.props.isVisible) {
            this.close();
          } else {
            this.props.onModalShow();
          }
        }
      );
    }
  };

  close = () => {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    if (this.backdropRef) {
      this.backdropRef.transitionTo(
        { opacity: 0 },
        this.props.backdropTransitionOutTiming
      );
    }

    let animationOut = this.animationOut;

    if (this.inSwipeClosingState) {
      this.inSwipeClosingState = false;
      if (this.props.swipeDirection === "up") {
        animationOut = "slideOutUp";
      } else if (this.props.swipeDirection === "down") {
        animationOut = "slideOutDown";
      } else if (this.props.swipeDirection === "right") {
        animationOut = "slideOutRight";
      } else if (this.props.swipeDirection === "left") {
        animationOut = "slideOutLeft";
      }
    }

    if (this.contentRef) {
      this.props.onModalWillHide && this.props.onModalWillHide();
      this.contentRef[animationOut](this.props.animationOutTiming).then(() => {
        this.isTransitioning = false;
        if (this.props.isVisible) {
          this.open();
        } else {
          this.setState(
            {
              showContent: false
            },
            () => {
              this.setState({
                isVisible: false
              });
            }
          );
          this.props.onModalHide();
        }
      });
    }
  };

  render() {
    const {
      animationIn,
      animationInTiming,
      animationOut,
      animationOutTiming,
      avoidKeyboard,
      hasBackdrop,
      backdropColor,
      backdropOpacity,
      backdropTransitionInTiming,
      backdropTransitionOutTiming,
      children,
      deviceHeight: deviceHeightProp,
      deviceWidth: deviceWidthProp,
      isVisible,
      onModalShow,
      onBackdropPress,
      onBackButtonPress,
      useNativeDriver,
      propagateSwipe,
      style,
      ...otherProps
    } = this.props;
    const deviceWidth = deviceWidthProp || this.state.deviceWidth;
    const deviceHeight = deviceHeightProp || this.state.deviceHeight;

    const computedStyle = [
      { margin: deviceWidth * 0.05, transform: [{ translateY: 0 }] },
      styles.content,
      style
    ];

    let panHandlers = {};
    let panPosition = {};
    if (this.state.isSwipeable) {
      panHandlers = { ...this.panResponder.panHandlers };

      if (useNativeDriver) {
        panPosition = {
          transform: this.state.pan.getTranslateTransform()
        };
      } else {
        panPosition = this.state.pan.getLayout();
      }
    }

    const _children =
      this.props.hideModalContentWhileAnimating &&
      this.props.useNativeDriver &&
      !this.state.showContent ? (
        <animatable.View />
      ) : (
        children
      );
    const containerView = (
      <animatable.View
        {...panHandlers}
        ref={ref => (this.contentRef = ref)}
        style={[panPosition, computedStyle]}
        pointerEvents="box-none"
        useNativeDriver={useNativeDriver}
        {...otherProps}
      >
        {_children}
      </animatable.View>
    );

    return (
      <Modal
        transparent={true}
        animationType={"none"}
        visible={this.state.isVisible}
        onRequestClose={onBackButtonPress}
        {...otherProps}
      >
        {hasBackdrop && (
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <animatable.View
              ref={ref => (this.backdropRef = ref)}
              useNativeDriver={true}
              style={[
                styles.backdrop,
                {
                  backgroundColor: this.state.showContent
                    ? backdropColor
                    : "transparent",
                  width: deviceWidth,
                  height: deviceHeight
                }
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        {avoidKeyboard && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            pointerEvents="box-none"
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
export { ReactNativeModal };
