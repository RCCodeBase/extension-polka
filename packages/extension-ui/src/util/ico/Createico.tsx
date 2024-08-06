// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface createicoProps {
    fill: string;
}

const Createico: React.FC<createicoProps> = ({ fill }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="27.643" height="27.643" viewBox="0 0 27.643 27.643">
            <g id="Group_21218" data-name="Group 21218" transform="translate(-8.1 -8.1)">
                <path id="Path_54689" data-name="Path 54689" d="M21.922,35.743A13.822,13.822,0,1,1,35.743,21.922,13.821,13.821,0,0,1,21.922,35.743Zm0-26.14A12.318,12.318,0,1,0,34.24,21.922,12.365,12.365,0,0,0,21.922,9.6Z" transform="translate(0 0)" fill={fill} />
                <path id="Path_54690" data-name="Path 54690" d="M19.3,30.6H33.989v1.619H19.3Z" transform="translate(-4.723 -9.488)" fill={fill} />
                <path id="Path_54691" data-name="Path 54691" d="M30.6,19.3h1.619V33.989H30.6Z" transform="translate(-9.488 -4.723)" fill={fill} />
            </g>
        </svg>
    );
};

export default Createico;
