import React from 'react';
import { deleteNameSpaces, resetNameSpaces } from 'components/Listener';
import s from './index.module.scss';

const Alert: IFC<{ children?: React.ReactNode }> = () => {
  const deleteKeywords = Object.keys(deleteNameSpaces).join(' ');
  const resetKeywords = Object.keys(resetNameSpaces).join(' ');

  return (
    <div className={s.alert}>
      что бы работал звук надо мышкой кликнуть в любое место на сайте
      <br />
      <br />
      <div className={s.row}>
        <h6 className={s.title}>Добавление записи:</h6>
        Любые однокоренные слова с &#34;пиши &#34;(например, &#34;напиши&#34; или
        &#34;запиши`&#34;), а так же слово &#34;Добавь&#34;
      </div>
      <div className={s.row}>
        <h6 className={s.title}>Удаление последней записи:</h6>
        {deleteKeywords}
      </div>
      <div className={s.row}>
        <h6 className={s.title}>Сброс записей</h6>
        {resetKeywords}
      </div>
    </div>
  );
};

export default Alert;
