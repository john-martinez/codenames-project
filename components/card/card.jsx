import styles from './card.module.scss';

export default function Card({
  word,
  updateMap,
  gameOver,
  isGameOver,
}){
  const {
    card,
    card__text,
  } = styles;
  
  const {
    text,
    color,
    isClicked,
  } = word;

  const onClickHandler = e => {
    if (color !== 'black'){
      updateMap(text);
    } else {
      gameOver();
    }

    console.log({
      text, 
      color,
      isClicked,
    })
  }
  return(
    <div 
      className={`${card} ${isClicked || isGameOver
        ? styles['card--disabled'] + ' ' + styles[`card--${color ? color : 'neutral'}`] 
        : ''}`
      } 
      onClick={onClickHandler}
    >
      <span className={ card__text }> { text } </span>
    </div>
  );
}