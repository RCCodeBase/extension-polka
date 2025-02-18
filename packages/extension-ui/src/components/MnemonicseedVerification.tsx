// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

import wordsData from '../assets/words.json';
import { useTranslation } from '../hooks/index.js';
import { styled } from '../styled.js';
import ButtonArea from './ButtonArea.js';
import NextStepButton from './NextStepButton.js';
import VerticalSpace from './VerticalSpace.js';

interface Props {
  className?: string;
  onNextStep: () => void;
  seed: string;
}

function MnemonicseedVerification ({ className, onNextStep, seed }: Props): React.ReactElement<Props> {
  const [wordsArray, setWordsArray] = useState<string[]>(seed.split(' '));
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [verifiedwords, setVerifiedwords] = useState<boolean>(false);
  const { t } = useTranslation();
  const positions = [4, 6, 10, 12];

  const getRandomWords = (words: string[], num: number): string[] => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  };

  useEffect(() => {
    const randomWordsdata = getRandomWords(wordsData.words, 8);
    const extractedwords = extractAndReplace(wordsArray, positions);
    const udpatedRandomarray = mergeAndInsertRandomly(extractedwords, randomWordsdata);

    setRandomWords(udpatedRandomarray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sentence: string = wordsArray.join(' ');

    if (sentence === seed) {
      setVerifiedwords(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsArray]);
  console.log('here', verifiedwords);

  // mergin of random arrays
  function mergeAndInsertRandomly (array1: string[], array2: string[]) {
    const resultArray = [...array2];

    array1.forEach((element) => {
      const randomIndex = Math.floor(Math.random() * (resultArray.length + 1));

      resultArray.splice(randomIndex, 0, element);
    });

    return resultArray;
  }

  // extract and replacing the position
  function extractAndReplace (sourceArray: string[], positions: number[]) {
    // positions.sort((a, b) => b - a);
    const extractedWords = positions.map((position: number) => sourceArray[position - 1]);

    positions.forEach((position) => {
      sourceArray[position - 1] = '';
    });
    setWordsArray(sourceArray);

    return extractedWords;
  }

  function handleDrop (event: React.DragEvent<HTMLDivElement>, index: number) {
    event.preventDefault();
    const word = event.dataTransfer.getData('text/plain');

    setWordsArray((prevWordsArray) => {
      const updatedWords = [...prevWordsArray];

      updatedWords[index] = word;

      return updatedWords;
    });
    const target = event.currentTarget as HTMLElement;

    target.classList.remove('drag-over');
  }

  function handleDragEnter (event: React.DragEvent<HTMLDivElement>) {
    const target = event.currentTarget as HTMLElement;

    target.classList.add('drag-over');
  }

  function handleDragLeave (event: React.DragEvent<HTMLDivElement>) {
    const target = event.currentTarget as HTMLElement;

    target.classList.remove('drag-over');
  }

  function handleDragStart (event: React.DragEvent<HTMLDivElement>, word: string) {
    event.dataTransfer.setData('text/plain', word);
    document.body.classList.add('dragging');
  }

  return (
    <>
      <div className={className}>
        <p className='txthead'>{t('12 word MNEMONIC seed')}</p>
        <p className='txtpara'>{t('Confirm your recovery phrase by filling the empty space with the below words')}</p>
        <div className='verifyMnemonic'>
          {wordsArray.map((word, index) => (
            positions.includes(index + 1)
              ? (
                <div
                  className='cardword opc'
                  key={index}
                  // eslint-disable-next-line react/jsx-no-bind
                  onDragEnter={handleDragEnter}
                  // eslint-disable-next-line react/jsx-no-bind
                  onDragLeave={handleDragLeave}
                  // eslint-disable-next-line react/jsx-no-bind
                  onDragOver={(e) => e.preventDefault()}
                  // eslint-disable-next-line react/jsx-no-bind
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {index + 1}. {word}
                </div>
              )
              : (
                <div
                  className='cardword'
                  key={index}
                >{index + 1}. {word}</div>
              )
          ))}
        </div>
        <div className='randomwords'>
          {randomWords.map((word, index) => (
            wordsArray.includes(word)
              ? (<div
                className='randomwnotdrag'
                key={index}
              // eslint-disable-next-line react/jsx-closing-bracket-location
              > {word}</div>)
              : (<div
                className='randomw'
                draggable
                key={index}
                // eslint-disable-next-line react/jsx-no-bind
                onDragStart={(e) => handleDragStart(e, word)}
              // eslint-disable-next-line react/jsx-closing-bracket-location
              > {word}</div>)
          ))}
        </div>

      </div>
      <VerticalSpace />
      <ButtonArea>
        <NextStepButton
          isDisabled={!verifiedwords}
          onClick={onNextStep}
        >
          {t('Complete verification')}
        </NextStepButton>
      </ButtonArea>
    </>
  );
}

export default styled(MnemonicseedVerification) <Props>`
.txthead{
text-align: left;
font: normal normal medium 16px Rubik;
letter-spacing: 0px;
font-weight:500;
margin-bottom:0px;
}
.txtpara{
text-align: left;
font: normal normal medium 12px Rubik;
letter-spacing: 0px;
font-weight:500;
font-size:12px !important;
}
.verifyMnemonic{
  background: var(--cardthemeBg);
  // border: 1px solid var(--boxBorderColor);
  box-sizing: border-box;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  }
  .cardword {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 50px;
  text-align: left;
  flex:18%;
  color:#707070;
  font-size:12px;
  margin:10px;
  opacity:0.5;
  padding-left: 10px;
  }
  .opc{
    opacity:1;
  }
  .opc.drag-over {
    background-color: #e0f2f1;
    border-color: #00796b; 
  }
  .randomwords{
  margin-bottom: 21px;
  box-sizing: border-box;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  }
  .randomw{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 50px;
  text-align: left;
  flex:18%;
  color:#707070;
  font-size:12px;
  margin:10px;
  padding-left: 10px;
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  }
  .randomw:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
    border-radius: 50px;
    border: 1px solid #40172F;
    opacity: 1;
  }
      .randomwnotdrag{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 50px;
  text-align: left;
  flex:18%;
  color:#707070;
  font-size:12px;
  margin:10px;
  padding-left: 10px;
  opacity:0.5;
  cursor: no-drop;
  cursor: -moz-no-drop;
  cursor: -webkit-no-drop;

  }
`;
