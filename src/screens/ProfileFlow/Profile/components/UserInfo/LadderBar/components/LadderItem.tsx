// SPDX-License-Identifier: ice License 1.0

import {HiddenProfileElement} from '@api/user/types';
import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useUpdateHiddenProfileElements} from '@store/modules/Account/hooks/useUpdateHiddenProfileElements';
import {ClosedEye} from '@svg/ClosedEye';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomInEasyDown,
  ZoomOutEasyDown,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  hidden?: boolean;
  title: string;
  enabled?: boolean;
  /**
   * Integer value to display with animation
   */
  value: number;
  isProfilePrivacyEditMode?: boolean;
  privacyType: HiddenProfileElement;
};

export const LadderItem = memo(
  ({
    hidden,
    title,
    value,
    enabled = false,
    isProfilePrivacyEditMode = false,
    privacyType,
  }: Props) => {
    const {onUpdate} = useUpdateHiddenProfileElements();

    const handlePress = () => {
      if (enabled) {
        onUpdate(privacyType);
      }
    };

    return (
      <View
        style={[
          styles.outerContainer,
          isProfilePrivacyEditMode && styles.editModeOuterContainer,
        ]}>
        <Touchable
          onPress={handlePress}
          style={[
            styles.container,
            isProfilePrivacyEditMode && styles.editModeContainer,
          ]}>
          <Text
            style={
              isProfilePrivacyEditMode
                ? styles.ladderLabelTextPrivacyEdit
                : styles.ladderLabelText
            }>
            {title}
          </Text>
          <View style={styles.ladderItem}>
            {hidden ? (
              <Animated.View
                entering={ZoomInEasyDown.springify().damping(50).stiffness(200)}
                exiting={ZoomOutEasyDown.springify().damping(50).stiffness(200)}
                style={styles.hiddenView}>
                <ClosedEye />
              </Animated.View>
            ) : (
              <Animated.Text
                entering={FadeIn.springify().damping(50).stiffness(200)}
                exiting={FadeOut.springify().damping(50).stiffness(200)}>
                <AnimatedNumberText
                  style={
                    isProfilePrivacyEditMode
                      ? styles.textPrivacyEdit
                      : styles.text
                  }
                  value={value}
                />
              </Animated.Text>
            )}
          </View>
        </Touchable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  outerContainer: {
    padding: rem(8),
    borderRadius: rem(16),
  },
  editModeOuterContainer: {
    backgroundColor: COLORS.white02opacity,
  },
  container: {
    paddingVertical: rem(8),
    paddingHorizontal: rem(10),
    borderRadius: rem(14),
    minWidth: rem(80),
  },
  editModeContainer: {
    backgroundColor: COLORS.white,
  },
  ladderItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(26),
  },
  hiddenView: {
    marginTop: rem(4),
    width: rem(60),
    height: rem(24),
    borderRadius: rem(16),
    backgroundColor: COLORS.dodgerBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: rem(4),
    ...font(20, 24, 'bold'),
  },
  textPrivacyEdit: {
    marginTop: rem(4),
    ...font(20, 24, 'bold', 'primaryDark'),
  },
  ladderLabelText: {
    marginHorizontal: rem(4),
    ...font(10, 12, 'regular', 'periwinkleGray', 'center'),
  },
  ladderLabelTextPrivacyEdit: {
    marginHorizontal: rem(4),
    ...font(10, 12, 'regular', 'periwinkleGray', 'center'),
  },
});