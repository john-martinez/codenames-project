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

    if (isClicked || isGameOver)
      classNames.push(styles['card--disabled'], styles[`card--${color ? color : 'neutral'}`])
    
    if (isSpyMaster) {
      console.log('hello')
      classNames.push(styles['card--disabled'], styles[`card--${color ? color : 'neutral'}-border`])
    }

    if (!turnsLeft){
      classNames.push(styles['card--disabled']);
    }

    console.log(classNames);
    return classNames.join(" ");
  }

  retrieveCardClassNames();
  return(
    <div 
      className={retrieveCardClassNames()} 
      onClick={onClickHandler}
    >
      <span className={ card__text }> { text } </span>
    </div>
  );
}