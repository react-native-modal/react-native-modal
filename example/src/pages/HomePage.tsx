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
          title={'Default'}
          onPress={this.makeNavigationAction('DefaultModal')}
        />
        <Button
          title={'Slow'}
          onPress={this.makeNavigationAction('SlowModal')}
        />
        <Button
          title={'Sliding from the sides'}
          onPress={this.makeNavigationAction('SlideModal')}
        />
        <Button
          title={'Fancy'}
          onPress={this.makeNavigationAction('FancyModal')}
        />
        <Button
          title={'Swipe'}
          onPress={this.makeNavigationAction('SwipeableModal')}
        />
        <Button
          title={'Scrollable'}
          onPress={this.makeNavigationAction('ScrollableModal')}
        />
        <Button
          title={'Bottom-Half'}
          onPress={this.makeNavigationAction('BottomHalfModal')}
        />
        <Button
          title={'Custom Backdrop'}
          onPress={this.makeNavigationAction('CustomBackdropModal')}
        />
        <Button
          title={'Close on Backdrop Press'}
          onPress={this.makeNavigationAction('BackdropCloseModal')}
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
