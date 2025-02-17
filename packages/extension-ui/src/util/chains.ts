// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDefBase } from '@polkadot/extension-inject/types';

import { selectableNetworks } from '@polkadot/networks';

const hashes: MetadataDefBase[] = selectableNetworks
  .filter(({ genesisHash }) => !!genesisHash.length)
  .map((network) => ({
    chain: network.displayName, // Sparknet
    genesisHash: network.genesisHash[0], // 0x99f72c0a4e8ec69365bb2b480302b719465d838cfefa9db0c5a91eed5378285c
    icon: network.icon, //
    ss58Format: network.prefix // sparknet
  }));

hashes.push({
  chain: 'CORD-Sparknet',
  genesisHash: '0x743115aca5f58453993db0b163772f35d086eafefe3b9bc30e304b76453e428a',
  icon: 'substrate',
  ss58Format: 29
});
export default hashes;
