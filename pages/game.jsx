import CardList from '../components/cardList/cardList';
import generateWords from 'random-words';


export default class Game extends React.Component {
  state = {
    words: new Map(),
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () => {
    let words = [];
    let redCount = 0;
    let blueCount = 0;
    let blackCount = 0;
    let uniqueWords = [];

    // this is to fix the API bug where sometimes it does not return enough words
    do {
      words = generateWords(25);
      uniqueWords = new Set(words);
    } while (uniqueWords.size !== 25)

    const wordsMap = new Map();
    words = words.map(word=> {
      let color = "";
      if (redCount !== 8){
        color = 'red';
        redCount++;
      }

      else if (blueCount !== 8) {
        color = 'blue';
        blueCount++;
      }

      else if (blackCount !== 1) {
        color = 'black';
        blackCount++;
      }
        
      return {
        text: word,
        color,
        isClicked: false
      }
    })

    this.shuffleCards(words);

    words.forEach(word=>{
      console.log(word);
      wordsMap.set(word.text, word)
    })

    this.setState({
      words: wordsMap
    })
  }

  shuffleCards = cards => {
    for (let i = 0; i < cards.length; i++){
      const MAX_NUMBER_PLUS_ONE = 25;
      const TARGET_INDEX = Math.floor(Math.random()*MAX_NUMBER_PLUS_ONE);
      [cards[i],cards[TARGET_INDEX]] = [cards[TARGET_INDEX], cards[i]];
    }
    console.log(cards);
  }

  updateMap = (key) => {
    const mapCopy = new Map(this.state.words);
    const data = mapCopy.get(key);
    data.isClicked = true;
    mapCopy.set(key, data);
    this.setState({ words: mapCopy });
  }

  render(){
    const { words } = this.state;
    const { updateMap } = this;

    return(
      <main>
        <CardList 
        words={words} 
        updateMap={updateMap}
      />
      <button onClick={this.initializeGame}>Restart</button>
      </main>
    );
  }
}