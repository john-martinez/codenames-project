import Card from '../card/card';
import styles from './cardlist.module.scss';

export default function CardList({
  words,
  updateMap,
}){
  const {
    cardList,
  } = styles;

  const cards = [];
  words.forEach(word=>cards.push(
    <Card 
      key={word.text} 
      word={word}
      updateMap={updateMap}
    />));

  return (
    <div className={ cardList }>
      { cards }
    </div>
  )
}