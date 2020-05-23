import CardList from '../components/cardList/cardList';
import generateWords from 'random-words';


export default class Game extends React.Component {
  state = {
    words: new Map(),
  }

  componentDidMount(){
    let words = [];
    // this is to fix the API bug where sometimes it does not return enough words
    while (words.length !== 25){
      words = generateWords(25);
      console.log(words.length)
    }

    const wordsMap = new Map();
    words.forEach(word=> wordsMap.set(word, {
      text: word,
      color: "",
      isClicked: false,
    }))

    this.setState({
      words: wordsMap
    })
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
      </main>
    );
  }
}