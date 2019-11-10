import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';

type State = {
  scrollOffset: null | number;
};

class ScrollableModal extends ModalBaseScene<State> {
  public scrollViewRef: React.RefObject<ScrollView>;
  constructor(props) {
    super(props, {
      scrollOffset: null,
    });

    this.scrollViewRef = React.createRef();
  }
  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };
  handleScrollTo = p => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };

  renderModal(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.isVisible()}
        onSwipeComplete={this.close}
        swipeDirection={['down']}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={400 - 300} // content height - ScrollView height
        style={styles.modal}>
        <View style={styles.scrollableModal}>
          <ScrollView
            ref={this.scrollViewRef}
            onScroll={this.handleOnScroll}
            scrollEventThrottle={16}>
            <View style={styles.scrollableModalContent1}>
              <Text style={styles.scrollableModalText1}>
                You can scroll me up! 👆
              </Text>
            </View>
            <View style={styles.scrollableModalContent2}>
              <Text style={styles.scrollableModalText2}>
                Same here as well! ☝
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});

export default ScrollableModal;
