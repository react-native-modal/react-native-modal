# react-native-animated-modal
A simple modal component that I used in several react-native projects.  
<br/>

## Description
Work in progress.
<br/>

## Setup
This library is available on npm, install it with: `npm install --save react-native-animated-modal`.  

## Usage
```javascript
import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-animated-modal'

export default class AnimatedModalTester extends Component {
  state = {
    isModalVisible: false
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={_showModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal visible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
          </View>
        </Modal>
      </View>
    )
  }

}
```
<br/>

# Gifs!
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-tips/master/imgs/modal.gif" height="300">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-android.gif" height="300">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-ios.gif" height="300">

## Available props
| Name | Type| Default | Description |
| --- | --- | --- | --- |
| animationInTiming | number | 300 | Timing for the modal show animation (in ms) |
| animationOutTiming | number | 300 | Timing for the modal hide animation (in ms) |
| backdropColor | string | 'black' | The backdrop background color |
| isVisible | bool | **REQUIRED** | Show the modal? |
| children | node | **REQUIRED** | The modal content |
| onModalShow | func | () => null | Called when the modal is completely visible |
| onModalHide | func | () => null | Called when the modal is completely hidden |
| style | any | null | Style applied to the modal |
