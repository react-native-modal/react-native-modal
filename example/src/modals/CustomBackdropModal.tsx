import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene';
import DefaultModalContent from '../utils/DefaultModalContent';

class CustomBackdropModal extends ModalBaseScene {
  renderModal(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.isVisible()}
        customBackdrop={
          <SafeAreaView style={styles.customBackdrop}>
            <Text style={styles.customBackdropText}>
              I'm in the backdrop! 👋
            </Text>
          </SafeAreaView>
        }>
        <DefaultModalContent onPress={this.close} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
});

export default CustomBackdropModal;
