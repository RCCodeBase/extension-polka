// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import warningico from '../assets/warning.svg';
import { styled } from '../styled.js';

interface Props {
  children: React.ReactNode;
  className?: string;
  isBelowInput?: boolean;
  isDanger?: boolean;
}

function Warningmnemonic ({ children, className = '', isBelowInput, isDanger }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} ${isDanger ? 'danger' : ''} ${isBelowInput ? 'belowInput' : ''}`}>
      <img src={warningico} />
      <div className='warning-messagetxt'>{children}</div>
    </div>
  );
}

export default React.memo(styled(Warningmnemonic)<Props>(({ isDanger }) => `
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  color: var(--subTextColor);
  margin-right: 20px;
  margin-top: 6px;

  &.belowInput {
    font-size: var(--labelFontSize);
    line-height: var(--labelLineHeight);

    &.danger {
      margin-top: -10px;
    }
  }

  &.danger {
    border-left-color: var(--buttonBackgroundDanger);
  }

  .warning-messagetxt {
    display: flex;
    align-items: center;
    font-size:14px;
    color: var(--textColorDanger);
    padding-left:20px;
    line-height: 20px;
  }

  .warningImage {
    margin: 5px 10px 5px 0;
    color: var(${isDanger ? '--iconDangerColor' : '--iconWarningColor'});
  }
`));
