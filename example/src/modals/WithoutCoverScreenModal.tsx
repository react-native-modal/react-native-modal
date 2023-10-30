import React from 'react';
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';
import DefaultModalContent from '../utils/DefaultModalContent';

class WithoutCoverScreenModal extends ModalBaseScene {
  renderModal(): React.ReactElement<any> {
    return (
      <Modal testID={'modal'} isVisible={this.isVisible()} coverScreen={false}>
        <DefaultModalContent onPress={this.close} />
      </Modal>
    );
  }
}

export default WithoutCoverScreenModal;
