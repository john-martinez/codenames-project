import styles from './card.module.scss';

export default function Card({
  word,
  updateMap,
  gameOver,
  isGameOver,
  isSpyMaster,
  turnsLeft,
}){
  const {
    card,
    card__text,
    card__inner,
    card__front,
    card__back,
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

  const retrieveCardClassNames = () => {
    let classNames = [];
    classNames.push(card);
  
    if (!turnsLeft || isClicked || isGameOver || isSpyMaster){
      classNames.push(styles['card__inner--disabled']);
    }

    return classNames.join(" ");
  }


  return(
    <div 
      className={retrieveCardClassNames()} 
      onClick={onClickHandler}
    >
      <div className={`${card__inner}
        ${isSpyMaster 
        ? styles[`card__inner--${color}-border`]
        : ''
      }
        ${isClicked || isGameOver
          ? styles['card__inner--flipped']
          : ''}
      `}>
        <div className={card__front}>
          <span className={ card__text }> { text } </span>
        </div>
        <div className={`${card__back} ${styles[`card__back--${color ? color : 'neutral'}`]}`}>
        </div>
      </div>
    </div>
  );
}