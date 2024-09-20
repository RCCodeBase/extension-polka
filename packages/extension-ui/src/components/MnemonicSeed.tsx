// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MouseEventHandler } from 'react';;
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from '../hooks/index.js';
import { styled } from '../styled.js';
import BoxWithLabel from './BoxWithLabel.js';
import Copyico from '../util/ico/Copyico';

interface Props {
  seed: string;
  onCopy: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

function MnemonicSeed({ className, onCopy, seed }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();


  const downloadFile = () => {
    const text = seed; // Replace with your text content
    const filename = "seed.txt";

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={className}>
      <BoxWithLabel
        label={t('Generated 12-word mnemonic seed:')}
        value={seed}
      />
      <div className='buttonsRow'>
        <CopyToClipboard text={seed}>
          <div
            className='DownloadFile'
            onClick={onCopy}
            data-seed-action='copy'
          >
            <Copyico  />
            <span>{t('Copy')}</span>
          </div>

        </CopyToClipboard>
        <div
          className='DownloadFile'
          onClick={downloadFile}
        >
          <span>{t('Download a copy')}</span>
          <Copyico />
        </div>
      </div>
    </div>
  );
}

export default styled(MnemonicSeed) <Props>`
  margin-bottom: 21px;
  background: var(--cardthemeBg);
  // border: 1px solid var(--boxBorderColor);
  box-sizing: border-box;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  .buttonsRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    .copyBtn {
      margin-right: 32px;
    }
    .DownloadFile {
    cursor:pointer;
    justify-content:center;
    align-items:center;
    display:flex;
      span {
      color: var(--labelColor);
      font-size: var(--labelFontSize);
      line-height: var(--labelLineHeight);
      padding-right:8px;
      padding-left:8px;
      }
    }
  }

  .mnemonicDisplay {
    .seedBox {
      color: var(--textColor);
      font-size: var(--fontSize);
      height: unset;
      letter-spacing: -0.01em;
      line-height: var(--lineHeight);
      margin-bottom: 10px;
    }
  }
`;
