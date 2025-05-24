/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import negative from 'assets/sound/negative.wav';
import positive from 'assets/sound/positive.wav';
import Alert from 'components/Alert';
import InfoIcon from 'components/InfoIcon';
import s from './index.module.scss';

export const resetNameSpaces: Record<string, number> = { ресет: 1, reset: 1, сброс: 1 };

export const deleteNameSpaces: Record<string, number> = { удали: 1, верни: 1, отмени: 1 };

const Listener = () => {
  const [isListening, setIsListening] = useState<0 | 1>(0);
  const [isAlertVisible, setAlertVisible] = useState([false, '']);
  const [list, setList] = useState<string[]>([]);
  const positiveAudioRef = useRef<HTMLAudioElement>(null);
  const negativeAudioRef = useRef<HTMLAudioElement>(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition() as SpeechRecognition;
  recognition.lang = 'ru-RU';

  const stopListeningHandler = () => {
    recognition.stop();
    setIsListening(0);
    window.location.reload();
  };

  const startListeningHandler = () => {
    recognition.start();
    setIsListening(1);

    if (positiveAudioRef?.current) {
      positiveAudioRef.current.volume = 0.4;
      positiveAudioRef.current.play().catch(console.log);
    }

    if (negativeAudioRef?.current) {
      negativeAudioRef.current.volume = 0.15;
      negativeAudioRef.current.play().catch(console.log);
    }
  };

  useEffect(() => {
    startListeningHandler();

    return () => {
      stopListeningHandler();
    };
  }, []);

  recognition.onend = function () {
    recognition.start();
    setIsListening(1);
  };

  const addNewElement = (value: string) => {
    // console.log('positiveAudio', positiveAudio);
    if (positiveAudioRef?.current) {
      positiveAudioRef.current.play();
    }

    setList((prevState) => [...prevState, value]);
  };

  const removeElement = () => {
    if (negativeAudioRef?.current) {
      negativeAudioRef.current.play();
    }
    setList((prevState) => {
      const targetState = prevState.slice(0, -1);

      return targetState;
    });
  };

  const resetList = stopListeningHandler;

  const executeCommand = (targetCommand: string, value: string) => {
    const command = targetCommand.toLocaleLowerCase();

    if (command.includes('пиши') || command === 'добавь') {
      addNewElement(value);

      return;
    }

    if (resetNameSpaces[command]) {
      resetList();

      return;
    }

    if (deleteNameSpaces[command]) {
      removeElement();

      return;
    }
    setAlertVisible([true, command + value]);
  };

  recognition.onresult = (event) => {
    const { transcript } = event.results[0][0];

    if (transcript.length) {
      const command = transcript.split(' ')[0].toLocaleLowerCase();
      const value = transcript.substring(transcript.indexOf(' ') + 1);

      executeCommand(command, value);
    }
  };

  const controlHandler = isListening ? stopListeningHandler : startListeningHandler;

  return (
    <div className={s.listener}>
      <audio ref={positiveAudioRef} src={positive} autoPlay />
      <audio ref={negativeAudioRef} src={negative} autoPlay />
      <div className={s.list}>
        {list.map((element, index) => (
          <div className={s.element} key={element}>
            <span className={s.index}> {index + 1}.</span> {element}
          </div>
        ))}

        {isListening && (
          <div className={s.element} style={{ fontSize: '2rem' }}>
            Listening...
          </div>
        )}
      </div>
      <button type="button" className={s.control} onClick={controlHandler}>
        {isListening ? 'reset' : 'start'}
      </button>
      <button
        type="button"
        className={s.info}
        onClick={() => setAlertVisible((prevState) => [!prevState[0]])}
      >
        <InfoIcon />
      </button>
      {isAlertVisible && <Alert>{isAlertVisible[1]}</Alert>}
    </div>
  );
};

export default Listener;
