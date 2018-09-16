import * as React from "react";
import PropTypes from "prop-types";
import Portal from "../Portal/Portal";

class ModalHost extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;
    return <Portal.Host>{children}</Portal.Host>;
  }
}

export default ModalHost;
