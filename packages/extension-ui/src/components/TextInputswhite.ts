// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { css } from 'styled-components';

import { styled } from '../styled.js';

interface Props {
  withError?: boolean;
}

const TextInputwhite = css<Props>(({ withError }) => `
  border-color: var(${withError ? '--errorBorderColor' : '--inputBorderColor'});
  box-sizing: border-box;
  color: var(${withError ? '--textColorDanger' : '--textColor'});
  display: block;
  font-family: var(--fontFamily);
  font-size: var(--fontSize);
  height: 40px;
  outline: none;
  padding: 0.5rem 0.75rem;
  resize: none;
  width: 100%;
  background: white;
  border: 0px;
  // border-bottom: 1px solid;
  border-radius: 10px;

  &:read-only {
    background: var(--readonlyInputBackground);
    box-shadow: none;
    outline: none;
  }
`);

export const TextAreawhite = styled.textarea<Props>`${TextInputwhite}`;
export const Inputwhite = styled.input<Props>`${TextInputwhite}`;
