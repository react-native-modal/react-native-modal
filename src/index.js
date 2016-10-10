/* eslint-disable no-return-assign */
import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-native'
import { View } from 'react-native-animatable'

import styles from './index.style.js'

export class BackdropModal extends Component {
  static propTypes = {
    animationIn: PropTypes.string,
    animationInTiming: PropTypes.number,
    animationOut: PropTypes.string,
    animationOutTiming: PropTypes.number,
    backdropColor: PropTypes.string,
    backdropOpacity: PropTypes.number,
    children: PropTypes.node.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    style: PropTypes.any
  }

  static defaultProps = {
    animationIn: 'slideInUp',
    animationInTiming: 300,
    animationOut: 'slideOutDown',
    animationOutTiming: 300,
    backdropColor: 'black',
    backdropOpacity: 0.70,
    onModalShow: () => null,
    onModalHide: () => null,
    isVisible: false
  }

  state = {
    isVisible: false
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.isVisible && nextProps.isVisible) {
      this.setState({ isVisible: true })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // On modal open request slide the view up and fade in the backdrop
    if (this.state.isVisible && !prevState.isVisible) {
      this._open()
    // On modal close request slide the view down and fade out the backdrop
    } else if (!this.props.isVisible && prevProps.isVisible) {
      this._close()
    }
  }

  _open = () => {
    this.backdropRef.transitionTo({ opacity: this.props.backdropOpacity })
    const contentInAnimation = this.contentRef[this.props.animationIn]
    contentInAnimation(this.props.animationInTiming)
      .then(() => {
        this.props.onModalShow()
      })
  }

  _close = async () => {
    this.backdropRef.transitionTo({ opacity: 0 })
    const contentOutAnimation = this.contentRef[this.props.animationOut]
    contentOutAnimation(this.props.animationOutTiming)
      .then(() => {
        this.setState({ isVisible: false })
        this.props.onModalHide()
      })
  }

  render () {
    const { children, style, backdropColor, ...otherProps } = this.props
    const { isVisible } = this.state
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={isVisible}
      >
        <View
          ref={(ref) => this.backdropRef = ref}
          style={[styles.backdrop, { backgroundColor: backdropColor }]}
        />
        <View ref={(ref) => this.contentRef = ref} style={[styles.content, style]} {...otherProps}>
          {children}
        </View>
      </Modal>
    )
  }
}

export default BackdropModal
