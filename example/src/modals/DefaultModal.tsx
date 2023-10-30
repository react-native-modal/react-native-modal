import React from 'react';

import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';
import DefaultModalContent from '../utils/DefaultModalContent';

class DefaultModal extends ModalBaseScene {
  renderModal(): React.ReactElement<any> {
    return (
      <Modal testID={'modal'} isVisible={this.isVisible()}>
        <DefaultModalContent onPress={this.close} />
      </Modal>
    );
  }
}

export default DefaultModal;
