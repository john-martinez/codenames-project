import styles from './card.module.scss';

export default function Card({
  word,
  updateMap,
}){
  const {
    card,
    card__text,
    card__clicked,
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
    <div className={`${card} ${isClicked ? card__clicked : ''}`} onClick={onClickHandler}>
      <span className={ card__text }> { text } </span>
    </div>
  );
}