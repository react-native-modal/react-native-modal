import * as React from "react";
import PortalConsumer from "./PortalConsumer";
import PortalHost, { PortalContext } from "./PortalHost";

class Portal extends React.Component {
  static Host = PortalHost;

  render() {
    const { children } = this.props;

    return (
      <PortalContext.Consumer>
        {manager => (
          <PortalConsumer manager={manager}>{children}</PortalConsumer>
        )}
      </PortalContext.Consumer>
    );
  }
}

export default Portal;
