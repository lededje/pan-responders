/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

import * as React from 'react';
import {useMemo, useRef, useState} from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  PanResponderGestureState,
} from 'react-native';

const CIRCLE_SIZE = 80;

interface Position {
  left: number;
  top: number;
}

function PanResponderExample(): React.ReactNode {
  const [position, setPosition] = useState<Position>({left: 20, top: 84});
  const [pressed, setPressed] = useState<boolean>(false);
  const circleRef = useRef<View>(null);
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setPressed(true);
        },
        onPanResponderMove: (
          _evt: any,
          gestureState: PanResponderGestureState,
        ) => {
          setPosition({
            left: position.left + gestureState.dx,
            top: position.top + gestureState.dy,
          });
        },
        onPanResponderRelease: () => {
          setPressed(false);
        },
      }),
    [position],
  );
  return (
    <View style={styles.container}>
      <View
        ref={circleRef}
        style={[
          styles.circle,
          {
            transform: [
              {translateX: position.left},
              {translateY: position.top},
            ],
            backgroundColor: pressed ? 'blue' : 'green',
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default PanResponderExample;
