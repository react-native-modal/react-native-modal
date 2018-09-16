import * as React from "react";
import Portal from "../Portal/Portal";
import Modal from "./Modal";

class ModalWrapper extends React.Component {
  render() {
    return (
      <Portal>
        <Modal {...this.props} />
      </Portal>
    );
  }
}

export default ModalWrapper;
