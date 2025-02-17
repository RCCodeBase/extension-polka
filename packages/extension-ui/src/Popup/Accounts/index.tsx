// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountWithChildren } from '@polkadot/extension-base/background/types';

import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import getNetworkMap from '@polkadot/extension-ui/util/getNetworkMap';
import { settings } from '@polkadot/ui-settings';

import { AccountContext, Dropdownnext, ThemeSwitchContext } from '../../components/index.js';
import { useTranslation } from '../../hooks/index.js';
import { Header } from '../../partials/index.js';
import { styled } from '../../styled.js';
import getLanguageOptions from '../../util/getLanguageOptions.js';
import AccountsTree from './AccountsTree.js';
import AddAccount from './AddAccount.js';

interface Props {
  className?: string;
}

function Accounts ({ className }: Props): React.ReactElement {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('');
  const [filteredAccount, setFilteredAccount] = useState<AccountWithChildren[]>([]);
  const { hierarchy } = useContext(AccountContext);
  const networkMap = useMemo(() => getNetworkMap(), []);
  const [isChecked, setIsChecked] = useState(false);
  const languageOptions = useMemo(() => getLanguageOptions(), []);
  // const [theme, setTheme] = useState(chooseTheme());
  const setThemeContext = useContext(ThemeSwitchContext);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    const theme = isChecked ? 'dark' : 'light';

    setThemeContext(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  useEffect(() => {
    setFilteredAccount(
      filter
        ? hierarchy.filter((account) =>
          account.name?.toLowerCase().includes(filter) ||
          (account.genesisHash && networkMap.get(account.genesisHash)?.toLowerCase().includes(filter)) ||
          account.address.toLowerCase().includes(filter)
        )
        : hierarchy
    );
  }, [filter, hierarchy, networkMap]);

  const _onFilter = useCallback((filter: string) => {
    setFilter(filter.toLowerCase());
  }, []);

  const _onChangeLang = useCallback(
    (value: string): void => {
      settings.set({ i18nLang: value });
    }, []
  );

  return (
    <>
      {(hierarchy.length === 0)
        ? <AddAccount />
        : (
          <>
            <Header
              onFilter={_onFilter}
              showAdd
              showConnectedAccounts
              // showSearch
              showSettings
              text={t('Accounts')}
            />
            <div className={className}>
              {filteredAccount.map((json, index): React.ReactNode => (
                <AccountsTree
                  {...json}
                  key={`${index}:${json.address}`}
                />
              ))}
            </div>
            <div className='footer'>
              <div className='themdiv'><p>Light </p>
                <label className='switch'>
                  <input
                    checked={isChecked}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={handleCheckboxChange}
                    type='checkbox'
                  />
                  <span className='slider round'></span>
                </label><p> Dark</p>
              </div>
              <div>Manage website access</div>
              <div>
                <Dropdownnext
                  className='dropdownfooter'
                  label=''
                  onChange={_onChangeLang}
                  options={languageOptions}
                  value={settings.i18nLang}
                /></div>
            </div>
          </>
        )
      }
    </>
  );
}

export default styled(Accounts) <Props>`
  height: calc(100vh - 2px);
  overflow-y: scroll;
  margin-top: -25px;
  padding-top: 25px;
  scrollbar-width: none;

    &::-webkit-scrollbar {
    display: none;
  }
`;
