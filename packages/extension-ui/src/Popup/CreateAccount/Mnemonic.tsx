// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import { ButtonArea, Checkbox, MnemonicSeed, NextStepButton, VerticalSpace, Warningmnemonic } from '../../components/index.js';
import { useToast, useTranslation } from '../../hooks/index.js';

interface Props {
  name: string;
  onNextStep: () => void;
  seed: string;
}

function Mnemonic ({ name, onNextStep, seed }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isMnemonicSaved, setIsMnemonicSaved] = useState(false);
  const { show } = useToast();

  const _onCopy = useCallback((): void => {
    show(t('Copied'));
  }, [show, t]);

  return (
    <>
      <MnemonicSeed
        onCopy={_onCopy}
        seed={seed}
      />
      <Warningmnemonic>
        {t("Please write down your wallet's mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your wallet.")}
      </Warningmnemonic>
      <VerticalSpace />
      <Checkbox
        checked={isMnemonicSaved}
        label={t('I have saved my mnemonic seed safely.')}
        onChange={setIsMnemonicSaved}
      />
      <ButtonArea>
        <NextStepButton
          isDisabled={!isMnemonicSaved || !name}
          onClick={onNextStep}
        >
          {t('Next step')}
        </NextStepButton>
      </ButtonArea>
    </>
  );
}

export default React.memo(Mnemonic);
