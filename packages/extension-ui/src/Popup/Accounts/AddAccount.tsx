// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext } from 'react';

// import AddAccountImage from './AddAccountImage.js';
import createaccount from '../../assets/createicon.svg';
import { ActionContext, ButtonSm } from '../../components/index.js';
import { useTranslation } from '../../hooks/index.js';
import Header from '../../partials/Header.js';
import { styled } from '../../styled.js';

interface Props {
  className?: string;
}

function AddAccount ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const _onClick = useCallback(
    () => onAction('/account/create'),
    [onAction]
  );

  return (
    <>
      <Header
        showAdd
        showSettings
      // text={t('Add Account')}
      />
      <div className={className}>
        <div className='image'>
          {/* <AddAccountImage onClick={_onClick} /> */}
          <img
            className='logo'
            src={createaccount}
          />
        </div>
        {/* <div className='no-accounts'>
          <p>{t("You currently don't have any accounts. Create your first account to get started.")} Cord</p>
        </div> */}

        <div className='btnsmarea'>
          <ButtonSm onClick={_onClick}>{t('Create an account')}</ButtonSm>
        </div>
      </div>
    </>
  );
}

export default React.memo(styled(AddAccount) <Props>`
  color: var(--textColor);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    color: var(--textColor);
    margin-top: 0;
    font-weight: normal;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
  }
  
  .btnsmarea{ 
  display: flex;
  flex-direction: row;
  padding: 12px 24px;
  margin-left: 0;
  margin-right: 0; 
   justify-content: center; 
  align-items: center; 
  }

  > .image {
    display: flex;
    justify-content: center;
     align-items: center; 
     margin-bottom:20px;
     margin-top:-20px;
  }

  > .no-accounts p {
    text-align: center;
    font-size: 16px;
    line-height: 26px;
    margin: 0 20px;
    color: var(--subTextColor);
  }
`);
