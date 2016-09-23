/* eslint-disable no-return-assign */
import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-native'
import { View } from 'react-native-animatable'

import styles from './index.style.js'

export class Backdrop extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.any
  }

  static defaultProps = {
    isVisible: false
  }

  state = {
    isVisible: false
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.visible && nextProps.visible) {
      this.setState({ isVisible: true })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // On modal open request slide the view up and fade in the backdrop
    if (this.state.visible && !prevState.visible) {
      this._open()
    // On modal close request slide the view down and fade out the backdrop
    } else if (!this.props.visible && prevProps.visible) {
      this._close()
    }
  }

  _open = () => {
    this.backdropRef.transitionTo({ opacity: 0.70 })
    this.contentRef.slideInUp(300)
  }

  _close = async () => {
    this.backdropRef.transitionTo({ opacity: 0 })
    this.contentRef.slideOutDown(300)
      .then(() => this.setState({ isVisible: false }))
  }

  render () {
    const { children, style, ...otherProps } = this.props
    const { isVisible } = this.state
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={isVisible}
      >
        <View ref={(ref) => this.backdropRef = ref} style={styles.backdrop} />
        <View ref={(ref) => this.contentRef = ref} style={[styles.content, style]} {...otherProps}>
          {children}
        </View>
      </Modal>
    )
  }
}

export default Backdrop
