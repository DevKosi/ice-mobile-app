// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SettingsIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      d="M20.25 12.57v-1.148l1.44-1.26a1.5 1.5 0 0 0 .285-1.912l-1.77-3a1.5 1.5 0 0 0-1.298-.75 1.5 1.5 0 0 0-.48.075l-1.822.615a8.502 8.502 0 0 0-.983-.563l-.382-1.89a1.5 1.5 0 0 0-1.5-1.207h-3.51a1.5 1.5 0 0 0-1.5 1.207l-.383 1.89a8.61 8.61 0 0 0-.99.563l-1.785-.645a1.5 1.5 0 0 0-.48-.045 1.5 1.5 0 0 0-1.297.75l-1.77 3a1.5 1.5 0 0 0 .307 1.882L3.75 11.43v1.147l-1.418 1.26a1.5 1.5 0 0 0-.307 1.913l1.77 3a1.5 1.5 0 0 0 1.297.75c.163 0 .326-.024.48-.075l1.823-.615c.315.209.643.397.982.562l.383 1.89a1.5 1.5 0 0 0 1.5 1.208h3.54a1.5 1.5 0 0 0 1.5-1.208l.382-1.89c.342-.165.673-.353.99-.562l1.815.615c.155.05.317.076.48.075a1.5 1.5 0 0 0 1.298-.75l1.71-3a1.5 1.5 0 0 0-.308-1.883L20.25 12.57ZM18.907 18l-2.572-.87c-.602.51-1.29.908-2.033 1.177L13.77 21h-3.54l-.533-2.663a7.02 7.02 0 0 1-2.025-1.177l-2.58.84-1.77-3 2.04-1.8a6.675 6.675 0 0 1 0-2.348L3.322 9l1.77-3 2.573.87a6.645 6.645 0 0 1 2.032-1.178L10.23 3h3.54l.532 2.662c.737.276 1.421.674 2.025 1.178l2.58-.84 1.77 3-2.04 1.8a6.674 6.674 0 0 1 0 2.347L20.677 15l-1.77 3Z"
      fill={color}
    />
    <Path
      d="M12 16.5a4.5 4.5 0 1 1 4.5-4.5 4.456 4.456 0 0 1-4.5 4.5ZM12 9a2.933 2.933 0 0 0-3 3 2.933 2.933 0 0 0 3 3 2.933 2.933 0 0 0 3-3 2.933 2.933 0 0 0-3-3Z"
      fill={color}
    />
  </Svg>
);
