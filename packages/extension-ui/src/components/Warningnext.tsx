// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { styled } from '../styled.js';

interface Props {
  children: React.ReactNode;
  className?: string;
  isBelowInput?: boolean;
  isDanger?: boolean;
}

function Warningnext ({ children, className = '', isBelowInput, isDanger }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} ${isDanger ? 'danger' : ''} ${isBelowInput ? 'belowInput' : ''}`}>
      <div className='warning-message'>{children}</div>
    </div>
  );
}

export default React.memo(styled(Warningnext)<Props>(({ isDanger }) => `
  color: var(--textColorDanger);
  width:40%;
  justify-content: center;
  align-items: center;
  display: flex;
  &.belowInput {
    font-size: var(--labelFontSize);
    line-height: var(--labelLineHeight);

    &.danger {
      margin-top: -5px;
    }
  }

  &.danger {
    border-left-color: var(--buttonBackgroundDanger);
  }

  .warning-message {
    display: flex;
    align-items: center;
  }

  .warningImage {
    margin: 5px 10px 5px 0;
    color: var(${isDanger ? '--iconDangerColor' : '--iconWarningColor'});
  }
`));
