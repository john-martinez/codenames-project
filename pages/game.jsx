import CardList from '../components/cardList/cardList';
import generateWords from 'random-words';


export default class Game extends React.Component {
  state = {
    words: new Map(),
  }

  componentDidMount(){
    let words = generateWords(25);
    const wordsMap = new Map();
    words.forEach(word=> wordsMap.set(word, {
      color: "",
      isClicked: false,
    }))

    this.setState({
      words: wordsMap
    })
  }

  render(){
    return(
      <main>
        <h1>I AM THE GAME</h1>
        <CardList />
      </main>
    );
  }
}