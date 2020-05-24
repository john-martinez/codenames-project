import styles from './card.module.scss';

export default function Card({
  word,
  updateMap,
  gameOver,
  isGameOver,
  isSpyMaster,
}){
  const {
    card,
    card__text,
    card__blueBorder,
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
      classNames.push(styles[`card--${color ? color : 'neutral'}-border`])
    }

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