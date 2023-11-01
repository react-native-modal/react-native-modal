import {RefObject, useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  PanResponderCallbacks,
  PanResponderGestureState,
} from 'react-native';

import {View} from 'react-native-animatable';
import {reverseRate} from '../../utils';
import {
  CustomAnimationType,
  Direction,
  GestureResponderEvent,
  MergedModalProps,
} from '../types';

const createAnimationEventForSwipe = (
  swipeDirection: Direction,
  pan: Animated.ValueXY,
) => {
  if (swipeDirection === 'right' || swipeDirection === 'left') {
    return Animated.event([null, {dx: pan.x}], {
      useNativeDriver: false,
    });
  } else {
    return Animated.event([null, {dy: pan.y}], {
      useNativeDriver: false,
    });
  }
};

const getSwipingDirection = (gestureState: PanResponderGestureState) => {
  if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
    return gestureState.dx > 0 ? 'right' : 'left';
  }

  return gestureState.dy > 0 ? 'down' : 'up';
};

const isDirectionIncluded = (
  swipeDirection: Direction | Direction[],
  currentSwipedirection: Direction,
) => {
  return Array.isArray(swipeDirection)
    ? swipeDirection.includes(currentSwipedirection)
    : swipeDirection === currentSwipedirection;
};

const getAccDistancePerDirection = (
  gestureState: PanResponderGestureState,
  currentSwipingDirection?: Direction,
) => {
  switch (currentSwipingDirection) {
    case 'up':
      return -gestureState.dy;
    case 'down':
      return gestureState.dy;
    case 'right':
      return gestureState.dx;
    case 'left':
      return -gestureState.dx;
    default:
      return 0;
  }
};

export const usePanResponder = (
  props: Pick<
    MergedModalProps,
    | 'scrollTo'
    | 'scrollOffset'
    | 'onSwipeStart'
    | 'backdropOpacity'
    | 'scrollOffsetMax'
    | 'panResponderThreshold'
    | 'propagateSwipe'
    | 'swipeDirection'
    | 'swipeThreshold'
    | 'onSwipeMove'
    | 'onSwipeCancel'
    | 'onSwipeComplete'
    | 'scrollHorizontal'
    | 'deviceWidth'
    | 'deviceHeight'
  >,
  refs: {
    backdropRef: RefObject<View>;
  },
) => {
  const {
    propagateSwipe,
    swipeDirection,
    swipeThreshold,
    onSwipeMove,
    onSwipeStart,
    scrollTo,
    panResponderThreshold,
    backdropOpacity,
    scrollOffsetMax,
    onSwipeCancel,
    onSwipeComplete,
    scrollHorizontal,
    scrollOffset,
    deviceHeight,
    deviceWidth,
  } = props;

  const {backdropRef} = refs;

  const [currentSwipingDirection, setCurrentSwipingDirection] =
    useState<Direction>();
  const [swipeClosing, setSwipeClosing] = useState(false);

  const shouldPropagateSwipe = useCallback(
    (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      return typeof propagateSwipe === 'function'
        ? propagateSwipe(evt, gestureState)
        : propagateSwipe;
    },
    [propagateSwipe],
  );

  const isSwipeDirectionAllowed = useCallback(
    ({dy, dx}: PanResponderGestureState) => {
      return Boolean(
        currentSwipingDirection &&
          swipeDirection &&
          isDirectionIncluded(swipeDirection, currentSwipingDirection) &&
          {
            down: dy > 0,
            up: dy < 0,
            left: dx < 0,
            right: dx > 0,
          }[currentSwipingDirection],
      );
    },
    [currentSwipingDirection, swipeDirection],
  );

  const calcDistanceRate = useCallback(
    (gestureState: PanResponderGestureState) => {
      switch (currentSwipingDirection) {
        case 'down':
          return (
            (gestureState.moveY - gestureState.y0) /
            (deviceHeight - gestureState.y0)
          );
        case 'up':
          return reverseRate(gestureState.moveY / gestureState.y0);
        case 'left':
          return reverseRate(gestureState.moveX / gestureState.x0);
        case 'right':
          return (
            (gestureState.moveX - gestureState.x0) /
            (deviceWidth - gestureState.x0)
          );

        default:
          return 0;
      }
    },
    [deviceHeight, deviceWidth, currentSwipingDirection],
  );

  const pan = useRef(new Animated.ValueXY()).current;
  const animEvt = useRef<((..._args: any[]) => void) | null>(null);

  const onMoveShouldSetPanResponder = useCallback<
    Required<PanResponderCallbacks>['onMoveShouldSetPanResponder']
  >(
    (evt, gestureState) => {
      // Use propagateSwipe to allow inner content to scroll. See PR:
      // https://github.com/react-native-community/react-native-modal/pull/246
      if (!shouldPropagateSwipe(evt, gestureState)) {
        // The number "4" is just a good tradeoff to make the panResponder
        // work correctly even when the modal has touchable buttons.
        // However, if you want to overwrite this and choose for yourself,
        // set panResponderThreshold in the
        // For reference:
        // https://github.com/react-native-community/react-native-modal/pull/197
        const shouldSetPanResponder =
          Math.abs(gestureState.dx) >= panResponderThreshold ||
          Math.abs(gestureState.dy) >= panResponderThreshold;
        if (shouldSetPanResponder && onSwipeStart) {
          onSwipeStart(gestureState);
        }

        const swipeDirection = getSwipingDirection(gestureState);
        setCurrentSwipingDirection(swipeDirection);
        animEvt.current = createAnimationEventForSwipe(swipeDirection, pan);
        return shouldSetPanResponder;
      }

      return false;
    },
    [
      backdropOpacity,
      onSwipeStart,
      pan,
      panResponderThreshold,
      shouldPropagateSwipe,
    ],
  );

  const onStartShouldSetPanResponder = useCallback<
    Required<PanResponderCallbacks>['onStartShouldSetPanResponder']
  >(
    (e: any, gestureState) => {
      const hasScrollableView =
        e._dispatchInstances &&
        e._dispatchInstances.some((instance: any) =>
          /scrollview|flatlist/i.test(instance.type),
        );

      if (
        hasScrollableView &&
        shouldPropagateSwipe(e, gestureState) &&
        scrollTo &&
        scrollOffset > 0
      ) {
        return false;
      }

      if (onSwipeStart) {
        onSwipeStart(gestureState);
      }

      setCurrentSwipingDirection(undefined);
      return true;
    },
    [onSwipeStart, scrollOffset, scrollTo, shouldPropagateSwipe],
  );

  const onPanResponderMove = useCallback<
    Required<PanResponderCallbacks>['onPanResponderMove']
  >(
    (evt, gestureState) => {
      if (!currentSwipingDirection) {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return;
        }

        const swipeDirection = getSwipingDirection(gestureState);
        setCurrentSwipingDirection(swipeDirection);
        animEvt.current = createAnimationEventForSwipe(swipeDirection, pan);
      }

      if (isSwipeDirectionAllowed(gestureState)) {
        const newOpacityFactor = 1 - calcDistanceRate(gestureState);

        backdropRef.current &&
          backdropRef.current.transitionTo({
            opacity: backdropOpacity * newOpacityFactor,
          });

        animEvt.current!(evt, gestureState);

        if (onSwipeMove) {
          onSwipeMove(newOpacityFactor, gestureState);
        }
      } else {
        if (scrollTo) {
          if (scrollHorizontal) {
            let offsetX = -gestureState.dx;
            if (offsetX > scrollOffsetMax) {
              offsetX -= (offsetX - scrollOffsetMax) / 2;
            }

            scrollTo({x: offsetX, animated: false});
          } else {
            let offsetY = -gestureState.dy;
            if (offsetY > scrollOffsetMax) {
              offsetY -= (offsetY - scrollOffsetMax) / 2;
            }

            scrollTo({y: offsetY, animated: false});
          }
        }
      }
    },
    [
      backdropOpacity,
      calcDistanceRate,
      currentSwipingDirection,
      isSwipeDirectionAllowed,
      onSwipeMove,
      pan,
      scrollHorizontal,
      scrollOffsetMax,
      scrollTo,
    ],
  );

  const onPanResponderRelease = useCallback<
    Required<PanResponderCallbacks>['onPanResponderRelease']
  >(
    (evt, gestureState) => {
      const accDistance = getAccDistancePerDirection(
        gestureState,
        currentSwipingDirection,
      );
      if (
        accDistance > swipeThreshold &&
        isSwipeDirectionAllowed(gestureState)
      ) {
        if (onSwipeComplete) {
          setSwipeClosing(true);
          onSwipeComplete(
            {
              swipingDirection: getSwipingDirection(gestureState),
            },
            gestureState,
          );
          return;
        }
        // Deprecated. Remove later.
        if ((props as any).onSwipe) {
          setSwipeClosing(true);
          (props as any).onSwipe();
          return;
        }
      }

      if (onSwipeCancel) {
        onSwipeCancel(gestureState);
      }

      if (backdropRef.current) {
        backdropRef.current.transitionTo({
          opacity: backdropOpacity,
        });
      }

      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        bounciness: 0,
        useNativeDriver: false,
      }).start();

      if (scrollTo) {
        if (scrollOffset > scrollOffsetMax) {
          scrollTo({
            y: scrollOffsetMax,
            animated: true,
          });
        }
      }
    },
    [
      backdropOpacity,
      currentSwipingDirection,
      isSwipeDirectionAllowed,
      onSwipeCancel,
      onSwipeComplete,
      pan,
      props,
      scrollOffset,
      scrollOffsetMax,
      scrollTo,
      swipeThreshold,
    ],
  );

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onPanResponderRelease,
      onPanResponderMove,
      onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder,
    });
  }, [
    onPanResponderRelease,
    onPanResponderMove,
    onStartShouldSetPanResponder,
    onMoveShouldSetPanResponder,
  ]);

  const getAnimationForSwipe = useCallback(():
    | CustomAnimationType
    | undefined => {
    if (swipeClosing) {
      setSwipeClosing(false);
      if (currentSwipingDirection === 'up') {
        return 'slideOutUp';
      } else if (currentSwipingDirection === 'down') {
        return 'slideOutDown';
      } else if (currentSwipingDirection === 'right') {
        return 'slideOutRight';
      } else if (currentSwipingDirection === 'left') {
        return 'slideOutLeft';
      }
    }
  }, [swipeClosing, currentSwipingDirection]);

  return {
    pan,
    panResponder,
    getAnimationForSwipe,
  };
};
