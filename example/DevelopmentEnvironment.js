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

export default class DevelopmentEnvironment extends Component {
  constructor(props) {
    super(props);
    this.appRefs = {
      1: React.createRef(),
      2: React.createRef()
    };
    this.state = {
      visible: 0,
      scrollOffset1: 0,
      scrollOffset2: 0,
    }
  }

  handleOnScroll = event => {
    this.setState({
      ["scrollOffset" + this.state.visible]: this.state.visible === 1 ? event.nativeEvent.contentOffset.x : event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.appRefs[this.state.visible].current) {
      this.appRefs[this.state.visible].current.scrollTo(p);
    }
  };

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ visible: 1 })}>
          <View style={styles.button}>
            <Text>Open the horizontal modal</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ visible: 2 })}>
          <View style={styles.button}>
            <Text>Open the vertical modal</Text>
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={this.state.visible === 1}
          onRequestClose={() => this.setState({ visible: 0 })}
          onSwipeComplete={() => this.setState({ visible: 0 })}
          swipeDirection="down"
          scrollHorizontal={true}
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset1}
          scrollOffsetMax={1000} // content height - ScrollView height
          style={styles.modal}>
          <View style={styles.modalView}>
            <ScrollView
              ref={this.appRefs[1]}
              onScroll={this.handleOnScroll}
              horizontal={true}
              style={{ borderWidth: 2 }}
              scrollEventThrottle={16}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>

                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>

                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>

                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>
              </View>
            </ScrollView>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.visible === 2}
          onRequestClose={() => this.setState({ visible: 0 })}
          onSwipeComplete={() => this.setState({ visible: 0 })}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset2}
          scrollOffsetMax={1000} // content height - ScrollView height
          style={styles.modal}>
          <View style={styles.modalView}>
            <ScrollView
              ref={this.appRefs[2]}
              onScroll={this.handleOnScroll}
              horizontal={false}
              scrollEventThrottle={16}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>

                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>

                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>

                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur consequuntur eaque
                  esse officiis tempora voluptatibus? Aliquid aspernatur dicta dolores ea error
                  excepturi harum, itaque nostrum quas sed, tenetur voluptates.
                </Text>
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
  modal: {
    backgroundColor: "grey",
    marginTop: 100,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  modalView: {
    backgroundColor: "white",
    height: "100%",
  },
  modalContent: {
    marginLeft: 30,
    marginRight: 30,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  }
});
