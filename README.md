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
        <TouchableOpacity onPress={this._showModal}>
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
For a more complex example take a look at the /example directory.
<br/>

# Gifs!
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-tips/master/imgs/modal.gif" height="300">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-ios.gif" height="300">

## Available props
| Name | Type| Default | Description |
| --- | --- | --- | --- |
| animationIn | string | 'slideInUp' | Modal show animation |
| animationInTiming | number | 300 | Timing for the modal show animation (in ms) |
| animationOut | string | 'slideOutDown' | Modal hide animation |
| animationOutTiming | number | 300 | Timing for the modal hide animation (in ms) |
| backdropColor | string | 'black' | The backdrop background color |
| backdropOpacity | number | 0.70 | The backdrop opacity when the modal is visible |
| backdropTransitionInTiming | number | 300 | The backdrop show timing (in ms) |
| backdropTransitionOutTiming | number | 300 | The backdrop hide timing (in ms) |
| isVisible | bool | **REQUIRED** | Show the modal? |
| children | node | **REQUIRED** | The modal content |
| onModalShow | func | () => null | Called when the modal is completely visible |
| onModalHide | func | () => null | Called when the modal is completely hidden |
| style | any | null | Style applied to the modal |
