import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';

type State<P> = P & {
  visible: boolean;
};

abstract class ModalBaseScene<P extends object = {}> extends Component<
  any,
  State<P>
> {
  abstract renderModal(): React.ReactElement<any>;

  constructor(props, state?: P) {
    super(props);
    this.state = {
      ...state,
      visible: false,
    };
  }

  open = () => this.setState({visible: true} as any);
  close = () => this.setState({visible: false} as any);
  isVisible = () => this.state.visible;
  public renderButton(): React.ReactElement<any> {
    return (
      <Button testID={'modal-open-button'} onPress={this.open} title="Open" />
    );
  }
  render() {
    return (
      <View style={styles.view}>
        {this.renderButton()}
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalBaseScene;
