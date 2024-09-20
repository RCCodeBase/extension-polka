// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

// import Label from './Label.js';

interface Props {
  className?: string;
  label: string;
  value?: string;
}

function BoxWithLabel ({ className,label, value }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
    <p className='labelseed'>{label}</p>
    {/* <Label
      className={className}
      label={label}
    > */}
      <div className='seedBox'>
        <span>{value}</span>
      </div>
    {/* </Label> */}
    </div>
  );
}

export default styled(BoxWithLabel)<Props>`
     .labelseed {
    margin: 0px;
    padding-bottom: 10px;
    font: normal normal medium 16px/19px Rubik;
    }
  .seedBox {
    // background: var(--readonlyInputBackground);
    box-shadow: none;
    // border-radius: var(--borderRadius);
    // border: 1px solid var(--inputBorderColor);
    // border-color: var(--inputBorderColor);
    box-sizing: border-box;
    display: block;
    font: normal normal normal 14px Rubik;
    outline: none;
    resize: none;
    width: 100%;
    margin-bottom: 10px;
  }
`;
