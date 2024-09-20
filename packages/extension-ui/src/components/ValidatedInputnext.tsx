// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ResultType, Validator } from '../util/validators.js';

import React, { useEffect, useState } from 'react';

import { useIsMounted } from '../hooks/index.js';
import { Result } from '../util/validators.js';
// import Warning from './Warning.js';
import { styled } from '../styled.js';
import { Warningnext } from './index.js';

interface BasicProps {
  isError?: boolean;
  value?: string | null;
  onChange?: (value: string) => void;
}

type Props<T extends BasicProps> = T & {
  className?: string;
  component: React.ComponentType<T>;
  defaultValue?: string;
  onValidatedChange: (value: string | null) => void;
  validator: Validator<string>;
}

function ValidatedInputnext<T extends Record<string, unknown>>({ className, component: Input, defaultValue, onValidatedChange, validator, ...props }: Props<T>): React.ReactElement<Props<T>> {
  const [value, setValue] = useState(defaultValue || '');
  const [validationResult, setValidationResult] = useState<ResultType<string>>(Result.ok(''));
  const isMounted = useIsMounted();

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    // Do not show any error on first mount
    if (!isMounted) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async (): Promise<void> => {
      const result = await validator(value);

      setValidationResult(result);
      onValidatedChange(Result.isOk(result) ? value : null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, validator, onValidatedChange]);

  return (
    <div className={className}>
      <Input
        {...props as unknown as T}
        isError={Result.isError(validationResult)}
        onChange={setValue}
        value={value}
      />
      {Result.isError(validationResult) && (
        <Warningnext
          isBelowInput
          isDanger
        >
          {validationResult.error.errorDescription}
        </Warningnext>
      )}
    </div>
  );
}

// export default ValidatedInputnext;
export default styled(ValidatedInputnext)`
  width:100%;
  display:flex;
  flex-direction:row;
  border-bottom: 1px solid;
  &.withoutMargin {
    margin-bottom: 0px;

   + .danger {
      margin-top: 6px;
    }
  }
`;