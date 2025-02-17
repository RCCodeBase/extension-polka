// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useMemo } from 'react';

import { settings } from '@polkadot/ui-settings';

import { ActionContext, Button, ButtonArea, Dropdownnext, List, VerticalSpace } from '../components/index.js';
import { useTranslation } from '../hooks/index.js';
import { Header } from '../partials/index.js';
import { styled } from '../styled.js';
import getLanguageOptions from '../util/getLanguageOptions.js';

interface Props {
  className?: string;
}

function Welcome ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const languageOptions = useMemo(() => getLanguageOptions(), []);

  const _onClick = useCallback(
    (): void => {
      window.localStorage.setItem('welcome_read', 'ok');
      onAction();
    },
    [onAction]
  );

  const _onChangeLang = useCallback(
    (value: string): void => {
      settings.set({ i18nLang: value });
    }, []
  );

  return (
    <>
      <Header />
      <h3>{t('Welcome')}</h3>
      <Dropdownnext
        className='dropdown'
        label=''
        onChange={_onChangeLang}
        options={languageOptions}
        value={settings.i18nLang}
      />
      <div className={className}>
        <p>{t('Before we start, just a couple of notes regarding use:')}</p>
        <List>
          <li>{t('We do not send any clicks, pageviews or events to a central server')}</li>
          <li>{t('We do not use any trackers or analytics')}</li>
          <li>{t("We don't collect keys, addresses or any information - your information never leaves this machine")}</li>
        </List>
        <p>{t('... we are not in the information collection business (even anonymized).')}</p>
      </div>
      <VerticalSpace />
      <ButtonArea>
        <Button onClick={_onClick}>{t('Understood, let me continue')}</Button>
      </ButtonArea>
    </>
  );
}

export default styled(Welcome) <Props>`
  p {
    color: var(--subTextColor);
    margin-bottom: 6px;
    margin-top: 0;
  }
  h3{
   font-style: normal;
  font-variant: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  font-family: Rubik;
  }
`;
