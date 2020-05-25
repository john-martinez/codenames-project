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
  for (let word in words){
    cards.push(
    <Card 
      key={word.text} 
      word={words[word]}
      updateMap={updateMap}
      gameOver={gameOver}
      isGameOver={isGameOver}
      isSpyMaster={isSpyMaster}
      turnsLeft={turnsLeft}
    />);
  }
  return (
    <div className={ cardList }>
      { cards }
    </div>
  )
}