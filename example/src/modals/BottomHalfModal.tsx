import React, {useState} from 'react'
import {StyleSheet, Text} from 'react-native'
import Modal from 'react-native-modal'
import DefaultModalContent from '../utils/DefaultModalContent'

const BottomHalfModal = ({navigation: {goBack}}) => {
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
      onBackdropPress={onClose}
      onModalWillHide={onModalWillHide}
      style={styles.view}>
      <DefaultModalContent onPress={onClose} />
    </Modal>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default BottomHalfModal
