# react-native-modal
An enhanced, animated and customizable react-native modal.  
Previously known as `react-native-animated-modal`.  

# Gifs!
<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-tips/master/imgs/modal.gif" height="300" />
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-ios.gif" height="300" />
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-animated-modal/master/extras/example-modal.gif" height="300" />
</p>

## Description
This component enhances the original react-native modal by adding animations and many possible customization options while still providing nice defaults:  
- You can customize the backdrop opacity, color, animation type and animation timing.  
- You can provide your own content and customize its animation type and animation timing.
- You'll know when the animations end thanks to `onModalShow` and `onModalHide`  

P.S.: The modal will resize itself correctly on device rotation.  

## Setup
This library is available on npm, install it with: `npm install --save react-native-modal`.  

## Usage
```javascript
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

export default class ModalTester extends Component {
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
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
          </View>
        </Modal>
      </View>
    )
  }

}
```
For a more complex example take a look at the `/example` directory.

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
| hideOnBack  | bool | true | Hide the modal on back button press? |
| onBackButton  | func | () => null | Called when the Android back button is pressed |
| isVisible | bool | **REQUIRED** | Show the modal? |
| children | node | **REQUIRED** | The modal content |
| onModalShow | func | () => null | Called when the modal is completely visible |
| onModalHide | func | () => null | Called when the modal is completely hidden |
| style | any | null | Style applied to the modal |

## Avaliable animations
Take a look at [react-native-animatable](https://github.com/oblador/react-native-animatable) for available animations.     
Pull requests, feedbacks and suggestions are welcome!  
P.S.: Thanks [@oblador](https://github.com/oblador) for react-native-animatable and [@brentvatne](https://github.com/brentvatne) for the npm namespace!  
