import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

function App(): React.JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View>
      <View style={{marginTop: 40, paddingInline: 40}}>
        <Button title={'Open Modal !'} onPress={() => setVisible(true)} />
      </View>
      <ReactNativeModal isVisible={visible}>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={() => setVisible(false)} />
        </View>
      </ReactNativeModal>
    </View>
  );
}

export default App;
