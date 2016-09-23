<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/logo.png" width="110" align="left">
# react-native-modal-datetime-picker
A react-native datetime-picker that works on both Android and iOS.
<br/>
<br/>

## Description
This library exposes a cross-platform interface for showing the native date and time pickers inside a modal.  
You will have an unified user experience, you won't have to worry anymore about testing the device platform and you won't have to programmatically call the Android TimePicker/DatePicker APIs.
<br/>

## Setup
This library is available on npm, install it with: `npm install --save react-native-modal-datetime-picker`.  

## GIFs!
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-android.gif">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-ios.gif">

## Usage
```javascript
import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)
    this._hideDateTimePicker()
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={_showDateTimePicker}>
          <Text>Show TimePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          visible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    )
  }

}
```
<br/>

## Available props
| Name | Type| Default | Description |
| --- | --- | --- | --- |
| visible | bool | false | Show the datetime picker? |
| onConfirm | func | **REQUIRED** | Funcion called on date picked. |
| onCancel | func | **REQUIRED** |  Funcion called on dismiss. |
| mode | string | 'date' | Datepicker? 'date' Timepicker? 'time' |
| date | obj | new Date() | Initial selected date/time |
| titleIOS | string | 'Pick a date' | The title text on iOS |
| confirmTextIOS | string | 'Confirm' | The text on the confirm button on iOS |
| cancelTextIOS | string | 'Cancel' | The text on the cancel button on iOS |  

All the [DatePickerIOS props](https://facebook.github.io/react-native/docs/datepickerios.html) are also supported!  

## Notes
Just remember to always set `visible` props to `false` in `onConfirm` and `onCancel` (like in the example above).  
Pull request and suggestions are welcome!  
