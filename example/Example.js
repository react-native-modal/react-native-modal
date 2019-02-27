/**
 * Example usage of react-native-modal
 * @format
 */

import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default class Example extends Component {
  state = {
    visibleModal: null,
  };

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Hello!</Text>
      {this.renderButton("Close", () => this.setState({ visibleModal: null }))}
    </View>
  );

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderButton("Default modal", () =>
          this.setState({ visibleModal: 1 }),
        )}
        {this.renderButton("Sliding from the sides", () =>
          this.setState({ visibleModal: 2 }),
        )}
        {this.renderButton("A slower modal", () =>
          this.setState({ visibleModal: 3 }),
        )}
        {this.renderButton("Fancy modal!", () =>
          this.setState({ visibleModal: 4 }),
        )}
        {this.renderButton("Bottom half modal", () =>
          this.setState({ visibleModal: 5 }),
        )}
        {this.renderButton("Modal that can be closed on backdrop press", () =>
          this.setState({ visibleModal: 6 }),
        )}
        {this.renderButton("Swipeable modal", () =>
          this.setState({ visibleModal: 7 }),
        )}
        {this.renderButton("Scrollable modal", () =>
          this.setState({ visibleModal: 8 }),
        )}
        <Modal isVisible={this.state.visibleModal === 1}>
          {this.renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 2}
          animationIn="slideInLeft"
          animationOut="slideOutRight">
          {this.renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 3}
          animationInTiming={2000}
          animationOutTiming={2000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={2000}>
          {this.renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 4}
          backdropColor={"red"}
          backdropOpacity={1}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}>
          {this.renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 5}
          style={styles.bottomModal}>
          {this.renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 6}
          onBackdropPress={() => this.setState({ visibleModal: null })}>
          {this.renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 7}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={["left"]}>
          {this.renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 8}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          style={styles.bottomModal}>
          <View style={styles.scrollableModal}>
            <ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              onScroll={this.handleOnScroll}
              scrollEventThrottle={16}>
              <View style={styles.scrollableModalContent1}>
                <Text>Scroll me up</Text>
              </View>
              <View style={styles.scrollableModalContent1}>
                <Text>Scroll me up</Text>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
});
