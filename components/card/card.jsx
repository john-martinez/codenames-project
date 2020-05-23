import styles from './card.module.scss';

export default function Card({
  word,
  updateMap,
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
    updateMap(text);
    console.log({
      text, 
      color,
      isClicked
    })
  }
  return(
    <div 
      className={`${card} ${isClicked 
        ? styles['card--clicked'] + ' ' + styles[`card--${color ? color : 'neutral'}`] 
        : ''}`
      } 
      onClick={onClickHandler}
    >
      <span className={ card__text }> { text } </span>
    </div>
  );
}