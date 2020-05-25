import Card from '../card/card';
import styles from './cardlist.module.scss';

export default function CardList({
  words,
  updateMap,
  gameOver,
  isGameOver,
  isSpyMaster,
  turnsLeft,
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
      gameOver={gameOver}
      isGameOver={isGameOver}
      isSpyMaster={isSpyMaster}
      turnsLeft={turnsLeft}
    />));

  return (
    <div className={ cardList }>
      { cards }
    </div>
  )
}