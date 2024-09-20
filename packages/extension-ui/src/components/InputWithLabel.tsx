// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import { useTranslation } from '../hooks/index.js';
import { styled } from '../styled.js';
// import Label from './Label.js';
import { Input } from './TextInputs.js';
import Warning from './Warning.js';

interface Props {
  className?: string;
  defaultValue?: string | null;
  disabled?: boolean;
  isError?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
  label: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
  withoutMargin?: boolean;
}

function InputWithLabel({ className, defaultValue, disabled, isError, isFocused, isReadOnly, label = '', onBlur, onChange, onEnter, placeholder, type = 'text', value, withoutMargin }: Props): React.ReactElement<Props> {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const { t } = useTranslation();

  const _checkKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      onEnter && event.key === 'Enter' && onEnter();

      if (type === 'password') {
        if (event.getModifierState('CapsLock')) {
          setIsCapsLock(true);
        } else {
          setIsCapsLock(false);
        }
      }
    },
    [onEnter, type]
  );

  const _onChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    // <Label
    //   className={`${className || ''} ${withoutMargin ? 'withoutMargin' : ''}`}
    //   label={label}
    // >
    <div className={`${className || ''} ${withoutMargin ? 'withoutMargin' : ''}`}>
      <Input
        autoCapitalize='off'
        autoCorrect='off'
        autoFocus={isFocused}
        defaultValue={defaultValue || undefined}
        disabled={disabled}
        onBlur={onBlur}
        onChange={_onChange}
        onKeyPress={_checkKey}
        placeholder={placeholder || label}
        readOnly={isReadOnly}
        spellCheck={false}
        type={type}
        value={value}
        withError={isError}
      />
      {isCapsLock && (
        <Warning isBelowInput>{t('Warning: Caps lock is on')}</Warning>
      )}
    </div>
  );
}

export default styled(InputWithLabel) <Props>`
  width:60%;
  &.withoutMargin {
    margin-bottom: 0px;

   + .danger {
      margin-top: 6px;
    }
  }
`;
