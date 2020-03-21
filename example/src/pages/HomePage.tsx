import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';

type Props = NavigationInjectedProps;

class HomePage extends React.Component<Props> {
  static navigationOptions = {
    title: 'Home',
  };

  makeNavigationAction = (to: string) => () =>
    this.props.navigation.navigate(to);
  render() {
    return (
      <View style={styles.view}>
        <Button
          testID={'default-modal-open-button'}
          title={'Default'}
          onPress={this.makeNavigationAction('DefaultModal')}
        />
        <Button
          testID={'slow-modal-open-button'}
          title={'Slow'}
          onPress={this.makeNavigationAction('SlowModal')}
        />
        <Button
          testID={'slide-modal-open-button'}
          title={'Sliding from the sides'}
          onPress={this.makeNavigationAction('SlideModal')}
        />
        <Button
          testID={'fancy-modal-open-button'}
          title={'Fancy'}
          onPress={this.makeNavigationAction('FancyModal')}
        />
        <Button
          testID={'swipeable-modal-open-button'}
          title={'Swipe'}
          onPress={this.makeNavigationAction('SwipeableModal')}
        />
        <Button
          testID={'scrollable-modal-open-button'}
          title={'Scrollable'}
          onPress={this.makeNavigationAction('ScrollableModal')}
        />
        <Button
          testID={'bottom-half-modal-open-button'}
          title={'Bottom-Half'}
          onPress={this.makeNavigationAction('BottomHalfModal')}
        />
        <Button
          testID={'custom-backdrop-modal-open-button'}
          title={'Custom Backdrop'}
          onPress={this.makeNavigationAction('CustomBackdropModal')}
        />
        <Button
          testID={'backdrop-close-modal-open-button'}
          title={'Close on Backdrop Press'}
          onPress={this.makeNavigationAction('BackdropCloseModal')}
        />
        <Button
          testID={'without-cover-screen'}
          title={'Without coverScreen'}
          onPress={this.makeNavigationAction('WithoutCoverScreenModal')}
        />
        <Button
          testID={'without-backdrop'}
          title={'Without backdrop'}
          onPress={this.makeNavigationAction('WithoutBackdropModal')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomePage;
