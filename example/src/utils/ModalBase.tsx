import React, {Children, Component, useCallback, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';

export const useModalBaseScensState = () => {
  const [visible, setVisible] = useState(false);
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  return {
    visible,
    open,
    close,
  };
};

export function ModalBaseScene<P extends object = {}>({
  onPress,
  children,
}: {
  onPress: any;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.view}>
      <Button testID={'modal-open-button'} onPress={onPress} title="Open" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalBaseScene;
