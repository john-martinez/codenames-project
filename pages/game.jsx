import CardList from '../components/cardList/cardList';
import generateWords from 'random-words';
import * as firebase from "firebase/app";
import 'firebase/firebase-database';

export default class Game extends React.Component {
  state = {
    words: new Map(),
    currentTeam: '',
    currentClue: '',
    isGameOver: false,
    isSpyMaster: false, 
    turnsLeft: 0,
  }

  componentDidMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyCu_chQBCXE-LogslxWcc2rEcp0iCk2wtI",
      authDomain: "codenames-and-spies.firebaseapp.com",
      databaseURL: "https://codenames-and-spies.firebaseio.com",
      projectId: "codenames-and-spies",
      storageBucket: "codenames-and-spies.appspot.com",
      messagingSenderId: "41934529171",
      appId: "1:41934529171:web:e7138340ab284a0852e366",
      measurementId: "G-P1X4ZHYRBT"
    };

    firebase.initializeApp(firebaseConfig);
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

    // generate unique words
    // this fixes the bug where the API returns duplicates
    do {
      words = generateWords(MAX_WORDS);
      uniqueWords = new Set(words);
    } while (uniqueWords.size !== MAX_WORDS)

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
    let wordObj = {};
    words.forEach(word =>{
      return wordObj[word.text] = word;
    })

    const db = firebase.database().ref();
    db.set({ words: wordObj })

    this.setState({ 
      words: wordObj,
      currentTeam: teamWhoGoesFirst,
      isGameOver: false,
      currentClue: '',
      isSpyMaster: this.state.isSpyMaster, 
      turnsLeft: 0,
    })
  }

  tossCoin = () => Math.floor(Math.random() * 2) ? 'red' : 'blue';
  gameOver = () => this.setState({ isGameOver: true })

  onSubmitHandler = e => {
    e.preventDefault();
    const { turnsLeft } = this.state;
    const { clue, num } = e.target;

    // prevents tampering with the form when clue already submitted til next turn
    if (!turnsLeft){
      this.setState({
        currentClue: clue.value,
        turnsLeft: num.value,
      })
    }
  }
  shuffleCards = cards => {
    for (let i = 0; i < cards.length; i++){
      const MAX_NUMBER_PLUS_ONE = 25;
      const TARGET_INDEX = Math.floor(Math.random() * MAX_NUMBER_PLUS_ONE);

      // swap values [a,b] = [b,a]
      [cards[i],cards[TARGET_INDEX]] = [cards[TARGET_INDEX], cards[i]];
    }
  }

  updateMap = (key) => {
    const { words, currentTeam, turnsLeft } = this.state;
    const wordsCopy = words;
    const data = wordsCopy[key];
    const isCardNeutral = !data.color;
    const isLastTurn = turnsLeft - 1 === 0;
    const isWrongCard = data.color !== currentTeam;
    let newTurnsLeft = turnsLeft;
    let team = currentTeam;
    data.isClicked = true;
    firebase.database().ref('words').child(key).once('value', snap=>{
      let newData = snap.val();
      newData.isClicked = true;

      firebase.database().ref('words').child(key).set(newData);
    })
    wordsCopy[key] = data;

   
    if (isCardNeutral || isLastTurn || isWrongCard) {
      if (currentTeam === 'red'){
        team = 'blue';
      }
      else {
        team = 'red';
      }
      newTurnsLeft = 0;
    } else {
      newTurnsLeft--;
    }
   
    this.setState({ 
      words: wordsCopy, 
      currentTeam: team,
      turnsLeft: newTurnsLeft,
    });
  }

  render(){
    const { words, currentTeam, isGameOver, isSpyMaster, currentClue, turnsLeft } = this.state;
    const { updateMap, gameOver, initializeGame, onSubmitHandler } = this;

    return(
      <main>
        <CardList 
        words={words} 
        updateMap={updateMap}
        gameOver={gameOver}
        isGameOver={isGameOver}
        isSpyMaster={isSpyMaster}
        turnsLeft={turnsLeft}
      />
      <h2>Current team playing: {currentTeam} </h2>
      <h2>Current clue: {currentClue} </h2>
      <h2>turnsLeft: {turnsLeft} </h2>
      {isGameOver && <h2>{currentTeam} lost!</h2>}
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="clue">Clue</label>
        <input type="text" name="clue" />
        
        <label htmlFor="number"># of guesses</label>
        <input type="number" name="num"/>
        <button>submit</button>
      </form>
      <button onClick={initializeGame}>Restart</button>
      </main>
    );
  }
}