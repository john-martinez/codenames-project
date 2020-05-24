import CardList from '../components/cardList/cardList';
import axios from 'axios';
import generateWords from 'random-words';


export default class Game extends React.Component {
  state = {
    words: new Map(),
    currentTeam: '',
    isGameOver: false,
    isSpyMaster: true, 
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () => {
    let words = [];
    const MAX_WORDS = 25;
    const MAX_PLAYER_CARD_COUNT = 8;
    const MAX_BLACK_CARD_COUNT = 1;
    let redCount = 0;
    let blueCount = 0;
    let blackCount = 0;
    let uniqueWords = [];
    let teamWhoGoesFirst = this.tossCoin();

    // add offset for the player who goes first
    if (teamWhoGoesFirst === 'red') {
      redCount--;
    } else {
      blueCount--;
    }
      
    console.log(teamWhoGoesFirst);

    // generate unique words
    // this fixes the bug where the API returns duplicates
    do {
      words = generateWords(MAX_WORDS);
      uniqueWords = new Set(words);
    } while (uniqueWords.size !== MAX_WORDS)

    const wordsMap = new Map();
    words = words.map(word=> {
      let color = "";
      if (redCount !== MAX_PLAYER_CARD_COUNT){
        color = 'red';
        redCount++;
      }

      else if (blueCount !== MAX_PLAYER_CARD_COUNT) {
        color = 'blue';
        blueCount++;
      }

      else if (blackCount !== MAX_BLACK_CARD_COUNT) {
        color = 'black';
        blackCount++;
      }
      
      return {
        text: word,
        color,
        isClicked: false
      }
    })

    // shuffle words array then put it in a map to improve speed
    this.shuffleCards(words);
    words.forEach(word => wordsMap.set(word.text, word))

    this.setState({ 
      words: wordsMap,
      currentTeam: teamWhoGoesFirst,
      isGameOver: false,
    })
  }

  tossCoin = () => Math.floor(Math.random() * 2) ? 'red' : 'blue';
  
  gameOver = () => this.setState({ isGameOver: true })
  shuffleCards = cards => {
    for (let i = 0; i < cards.length; i++){
      const MAX_NUMBER_PLUS_ONE = 25;
      const TARGET_INDEX = Math.floor(Math.random() * MAX_NUMBER_PLUS_ONE);

      // swap values [a,b] = [b,a]
      [cards[i],cards[TARGET_INDEX]] = [cards[TARGET_INDEX], cards[i]];
    }
  }

  updateMap = (key) => {
    const { words, currentTeam } = this.state;
    const mapCopy = new Map(words);
    const data = mapCopy.get(key);
    let team = '';
    data.isClicked = true;
    mapCopy.set(key, data);

    // GOTTA FIX THIS PART TO CHANGE ONLY WHEN THE TURN IS DONE
    if (currentTeam === 'red')
      team = 'blue';
    else 
      team = 'red';


    this.setState({ words: mapCopy, currentTeam: team });
  }

  render(){
    const { words, currentTeam, isGameOver, isSpyMaster } = this.state;
    const { updateMap, gameOver } = this;

    return(
      <main>
        <CardList 
        words={words} 
        updateMap={updateMap}
        gameOver={gameOver}
        isGameOver={isGameOver}
        isSpyMaster={isSpyMaster}
      />
      <h2>Current team playing: {currentTeam} </h2>
      {isGameOver && <h2>{currentTeam} lost!</h2>}
      <button onClick={this.initializeGame}>Restart</button>
      </main>
    );
  }
}