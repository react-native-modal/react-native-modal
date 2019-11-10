import React from 'react';

// @ts-ignore
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';
import DefaultModalContent from '../utils/DefaultModalContent';

class SwipeableModal extends ModalBaseScene {
  renderModal(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.isVisible()}
        onSwipeComplete={this.close}
        swipeDirection={['down']}>
        <DefaultModalContent onPress={this.close} />
      </Modal>
    );
  }
}

export default SwipeableModal;
