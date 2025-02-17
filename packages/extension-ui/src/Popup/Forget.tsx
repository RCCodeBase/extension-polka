// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RouteComponentProps } from 'react-router';

import React, { useCallback, useContext, useState } from 'react';
import { withRouter } from 'react-router';

import { ActionBar, ActionContext, ActionText, Addressnext, Button, InputWithLabelwhite, Warningmnemonic } from '../components/index.js';
import { useTranslation } from '../hooks/index.js';
import { forgetAccount, validateAccount } from '../messaging.js';
import { Header } from '../partials/index.js';
import { styled } from '../styled.js';

interface Props extends RouteComponentProps<{ address: string }> {
  className?: string;
}

const MIN_LENGTH = 6;

function Forget ({ className, match: { params: { address } } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [pass, setPass] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');

  const _goHome = useCallback(
    () => onAction('/'),
    [onAction]
  );

  const onPassChange = useCallback(
    (password: string) => {
      setPass(password);
      setError('');
    }
    , []);

  const _onClick = useCallback(
    async (): Promise<void> => {
      setIsBusy(true);
      const isUnlockable = await validateAccount(address, pass);

      if (isUnlockable) {
        forgetAccount(address)
          .then(() => {
            setIsBusy(false);
            onAction('/');
          })
          .catch((error: Error) => {
            setIsBusy(false);
            console.error(error);
          });
      } else {
        setIsBusy(false);
        setError('Password wrong');
      }
    },
    [address, onAction, pass]
  );

  return (
    <>
      <Header
        showBackArrow
        text={t('Forget account')}
      />
      <div className={className}>
        <Addressnext address={address}>
          <Warningmnemonic className='movedWarning'>
            {t('You are about to remove the account. This means that you will not be able to access it via this extension anymore. If you wish to recover it, you would need to use the seed.')}
          </Warningmnemonic>
          <div className='actionArea'>
            <InputWithLabelwhite
              data-export-password
              disabled={isBusy}
              isError={pass.length < MIN_LENGTH || !!error}
              label={t('password for this account')}
              onChange={onPassChange}
              placeholder='Password'
              type='password'
            />
            {error && (
              <Warningmnemonic
                isBelowInput
                isDanger
              >
                {error}
              </Warningmnemonic>
            )}
            <Button
              isBusy={isBusy}
              isDanger
              onClick={_onClick}
            >
              {t('I want to forget this account')}
            </Button>
            <ActionBar className='withMarginTop'>
              <ActionText
                className='center'
                onClick={_goHome}
                text={t('Cancel')}
              />
            </ActionBar>
          </div>
        </Addressnext>
      </div>
    </>
  );
}

export default withRouter(styled(Forget)`
  .actionArea {
    padding: 10px 24px;
  }

  .center {
    margin: auto;
  }

  .movedWarning {
    margin-top: 8px;
  }

  .withMarginTop {
    margin-top: 4px;
  }
`);
