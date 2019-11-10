import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Navigator from './src/Navigator';

class App extends Component {
  render() {
    return <Navigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;
