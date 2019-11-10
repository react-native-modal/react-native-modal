import React from 'react';
import {StyleSheet} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';
import DefaultModalContent from '../utils/DefaultModalContent';

class BottomHalfModal extends ModalBaseScene {
  renderModal(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.isVisible()}
        onSwipeComplete={this.close}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.view}>
        <DefaultModalContent onPress={this.close} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default BottomHalfModal;
