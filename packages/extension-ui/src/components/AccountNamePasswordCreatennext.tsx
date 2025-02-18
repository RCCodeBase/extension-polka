// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';

import { Password } from '../partials/index.js';
import { styled } from '../styled.js';
import { ButtonArea, NextStepButton, VerticalSpace } from './index.js';

interface Props {
  buttonLabel?: string;
  isBusy: boolean;
  name: string;
  className?: string;
  // onBackClick?: () => void;
  onCreate: (name: string, password: string) => void | Promise<void | boolean>;
  onNameChange: (name: string) => void;
  onPasswordChange?: (password: string) => void;
}

function AccountNamePasswordCreationnext ({ buttonLabel, className, isBusy, name, onCreate, onNameChange, onPasswordChange }: Props): React.ReactElement<Props> {
  const [password, setPassword] = useState<string | null>(null);

  useEffect((): void => {
    onNameChange(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onCreate = useCallback(
    (): void => {
      if (name && password) {
        Promise
          .resolve(onCreate(name, password))
          .catch(console.error);
      }
    },
    [name, password, onCreate]
  );
    // const _onNameChange = useCallback(
    //   (name: string | null) => {
    //     onNameChange(name || '');
    //     setName(name);
    //   },
    //   [onNameChange]
    // );

  const _onPasswordChange = useCallback(
    (password: string | null) => {
      onPasswordChange && onPasswordChange(password || '');
      setPassword(password);
    },
    [onPasswordChange]
  );

  // const _onBackClick = useCallback(
  //   () => {
  //     _onNameChange(null);
  //     setPassword(null);
  //     onBackClick && onBackClick();
  //   },
  //   [_onNameChange, onBackClick]
  // );

  return (
    <div className={className}>
      {/* <Name
        isFocused
        onChange={_onNameChange}
      /> */}
      <Password onChange={_onPasswordChange} />
      <VerticalSpace />
      {buttonLabel && (
        <ButtonArea>
          {/* <BackButton onClick={_onBackClick} /> */}
          <NextStepButton
            data-button-action='add new root'
            isBusy={isBusy}
            isDisabled={!password}
            left={true}
            onClick={_onCreate}
          >
            {buttonLabel}
          </NextStepButton>
        </ButtonArea>
      )}
    </div>
  );
}

// export default React.memo(AccountNamePasswordCreation);
export default styled(React.memo(AccountNamePasswordCreationnext)) <Props>`
margin-top:40px;
height:80%;
.password{
padding-left:0px;
margin-top:30px;
}
`;
