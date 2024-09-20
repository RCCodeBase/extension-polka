// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { styled } from '../styled.js';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Main ({ children, className }: Props): React.ReactElement<Props> {
  return (
    <main className={className}>
      {children}
    </main>
  );
}

export default styled(Main)<Props>`
  display: flex;
  flex-direction: column;
  height: calc(100vh);
  background: var(--background);
  color: var(--textColor);
  font-size: var(--fontSize);
  line-height: var(--lineHeight);
  * {
    font-family: var(--fontFamily);
  }

  > * {
    padding-left: 30px;
    padding-right: 30px;
  }
  .footer{
  border-top: 1px solid white;
  font-size: 12px;
  padding-top:3px;
  display: flex;
  justify-content: space-between;

  .dropdownfooter{
  margin-bottom: 0px;
  border:0px;

  select{
  font-size:12px !important;
  margin-right: 10px;
  }
  }

  .switch {
  position: relative;
  display: inline-block;
  width: 31px;
  height: 17px;
}
  p{
  margin:0px;
  padding-left:5px;
  padding-right:5px;
  }
.themdiv{
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: var(--swithcolor);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #fff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #fff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
  }
  }

.passworddiv {
margin-top:30px;
}
`;
