import React from 'react';

import Modal from '@tkow/react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';
import DefaultModalContent from '../utils/DefaultModalContent';

class SlideModal extends ModalBaseScene {
  renderModal(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.isVisible()}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <DefaultModalContent onPress={this.close} />
      </Modal>
    );
  }
}

export default SlideModal;
