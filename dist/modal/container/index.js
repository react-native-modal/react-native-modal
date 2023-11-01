import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle, } from 'react';
import { BackHandler, InteractionManager, KeyboardAvoidingView, Platform, } from 'react-native';
import * as animatable from 'react-native-animatable';
import { buildAnimations } from '../../utils';
import Backdrop from './backdrop';
import { usePanResponder } from './hooks';
import styles from '../modal.style';
function ReactNativeModalContainer(props, ref) {
    const { animationIn: animationInFromProps, animationInTiming, animationOut: animationOutFromProps, animationOutTiming, avoidKeyboard, coverScreen, hasBackdrop, backdropColor, backdropOpacity, backdropTransitionInTiming, backdropTransitionOutTiming, customBackdrop, children, isVisible, onModalShow, onBackButtonPress: onBackButtonPressFromProps, useNativeDriver, propagateSwipe, style, deviceWidth, deviceHeight, swipeDirection, useNativeDriverForBackdrop, onBackdropPress, hideModalContentWhileAnimating, onModalWillShow, onModalHide, onModalWillHide, onToggleModal: setIsVisible, ...otherProps } = props;
    const containerProps = otherProps;
    const isSwipeable = useMemo(() => !!swipeDirection, [swipeDirection]);
    const [showContent, setShowContent] = useState(isVisible);
    const { animationIn, animationOut } = useMemo(() => buildAnimations({
        animationIn: animationInFromProps,
        animationOut: animationOutFromProps,
    }), [animationInFromProps, animationOutFromProps]);
    const contentRef = useRef(null);
    const backdropRef = useRef(null);
    const isTransitioning = useRef(false);
    const interactionHandle = useRef(null);
    const onBackButtonPress = useCallback(() => {
        if (onBackButtonPressFromProps && isVisible) {
            onBackButtonPressFromProps();
            return true;
        }
        return false;
    }, [onBackButtonPressFromProps, isVisible]);
    const { panResponder, pan } = usePanResponder(props, {
        backdropRef,
    });
    const open = useCallback(async () => {
        if (isTransitioning.current) {
            return;
        }
        isTransitioning.current = true;
        backdropRef.current?.transitionTo({ opacity: backdropOpacity }, backdropTransitionInTiming);
        if (isSwipeable) {
            pan.setValue({ x: 0, y: 0 });
        }
        if (contentRef.current) {
            onModalWillShow && onModalWillShow();
            if (interactionHandle.current === null) {
                interactionHandle.current =
                    InteractionManager.createInteractionHandle();
            }
            return contentRef.current
                .animate(animationIn, animationInTiming)
                .then(() => {
                isTransitioning.current = false;
                if (interactionHandle.current) {
                    InteractionManager.clearInteractionHandle(interactionHandle.current);
                    interactionHandle.current = null;
                }
                setIsVisible(true);
                setShowContent(true);
                onModalShow();
            });
        }
    }, [
        animationIn,
        animationInTiming,
        backdropOpacity,
        backdropTransitionInTiming,
        isSwipeable,
        isVisible,
        onModalShow,
        onModalWillShow,
        pan,
    ]);
    const close = useCallback(async (args) => {
        const { immediate } = args || {};
        if (isTransitioning.current) {
            return;
        }
        isTransitioning.current = true;
        backdropRef.current?.transitionTo({ opacity: 0 }, backdropTransitionOutTiming);
        if (contentRef.current) {
            onModalWillHide();
            if (immediate) {
                isTransitioning.current = false;
                if (interactionHandle.current) {
                    InteractionManager.clearInteractionHandle(interactionHandle.current);
                    interactionHandle.current = null;
                }
                setIsVisible(false);
                setShowContent(false);
                onModalHide();
                return;
            }
            if (interactionHandle.current === null) {
                interactionHandle.current =
                    InteractionManager.createInteractionHandle();
            }
            return contentRef.current
                .animate(animationOut, animationOutTiming)
                .then(() => {
                isTransitioning.current = false;
                if (interactionHandle.current) {
                    InteractionManager.clearInteractionHandle(interactionHandle.current);
                    interactionHandle.current = null;
                }
                setIsVisible(false);
                setShowContent(false);
                onModalHide();
            });
        }
    }, [
        animationOut,
        animationOutTiming,
        backdropTransitionOutTiming,
        isVisible,
        onModalHide,
        onModalWillHide,
    ]);
    useEffect(function componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', onBackButtonPress);
        return function componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress);
            if (interactionHandle.current) {
                InteractionManager.clearInteractionHandle(interactionHandle.current);
                interactionHandle.current = null;
            }
        };
    }, [onBackButtonPress]);
    useEffect(function () {
        if (backdropRef.current) {
            backdropRef.current.transitionTo({ opacity: backdropOpacity }, backdropTransitionInTiming);
        }
    }, [backdropOpacity, backdropTransitionInTiming]);
    useEffect(function getDerivedStateFromProps() {
        if (isVisible) {
            open();
        }
        else if (!isVisible) {
            close();
        }
    }, [isVisible, open, close]);
    const panHandlers = isSwipeable ? panResponder.panHandlers : {};
    const panPosition = useNativeDriver
        ? {
            transform: pan.getTranslateTransform(),
        }
        : pan.getLayout();
    const containerView = (React.createElement(animatable.View, { ...panHandlers, ref: contentRef, style: [
            panPosition,
            { margin: deviceWidth * 0.05, transform: [{ translateY: 0 }] },
            styles.content,
            style,
        ], pointerEvents: "box-none", useNativeDriver: useNativeDriver, ...containerProps }, hideModalContentWhileAnimating && useNativeDriver && !showContent ? (React.createElement(animatable.View, null)) : (children)));
    useImperativeHandle(ref, () => ({
        open,
        close,
    }));
    return (React.createElement(React.Fragment, null,
        React.createElement(Backdrop, { ...props, showContent: showContent, ref: backdropRef }),
        !coverScreen && avoidKeyboard ? (React.createElement(KeyboardAvoidingView, { behavior: Platform.OS === 'ios' ? 'padding' : undefined, pointerEvents: "box-none", style: [styles.content, style, { margin: 0 }] }, containerView)) : (containerView)));
}
export default forwardRef(ReactNativeModalContainer);
