import React, {useState} from 'react'
import {SafeAreaView, StyleSheet, Text} from 'react-native'
import Modal from 'react-native-modal'
import DefaultModalContent from '../utils/DefaultModalContent'

const CustomBackdropModal = ({navigation: {goBack}}) => {
  const [showModal, setShowModal] = useState(true)

  const onClose = () => {
    setShowModal(false)
  }

  const onModalWillHide = () => {
    goBack()
  }

  return (
    <Modal
      testID={'modal'}
      isVisible={showModal}
      onModalWillHide={onModalWillHide}
      customBackdrop={
        <SafeAreaView style={styles.customBackdrop}>
          <Text style={styles.customBackdropText}>I'm in the backdrop! 👋</Text>
        </SafeAreaView>
      }>
      <DefaultModalContent onPress={onClose} />
    </Modal>
  )
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
})

export default CustomBackdropModal
