import React from 'react';

// @ts-ignore
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';
import DefaultModalContent from '../utils/DefaultModalContent';

class FancyModal extends ModalBaseScene {
  renderModal(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.isVisible()}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <DefaultModalContent onPress={this.close} />
      </Modal>
    );
  }
}

export default FancyModal;
