import React from "react";
import CardRow from "./CardRow";
import Button from "./Button";
import Card from "./Card";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.defaultData = {
            cards: this.shuffle([
                {number: 'A', symbol: 'heart'},
                {number: 2, symbol: 'diamond'},
                {number: 3, symbol: 'ace'},
                {number: 4, symbol: 'clover'},
                {number: 5, symbol: 'heart'},
                {number: 6, symbol: 'diamond'},
                {number: 7, symbol: 'ace'},
                {number: 8, symbol: 'clover'},
                {number: 9, symbol: 'heart'},
                {number: 10, symbol: 'diamond'},
                {number: 'J', symbol: 'ace'},
                {number: 'Q', symbol: 'clover'},
                {number: 'K', symbol: 'heart'},
                {number: 'A', symbol: 'diamond'},
                {number: 2, symbol: 'ace'},
                {number: 3, symbol: 'clover'},
                {number: 4, symbol: 'heart'},
                {number: 5, symbol: 'diamond'},
                {number: 6, symbol: 'ace'},
                {number: 7, symbol: 'clover'},
                {number: 8, symbol: 'heart'},
            ]),
            lap: 0,
            started: false,
            ended: false,
            deck1: null,
            deck2: null,
            deck3: null
        };

        this.state = this.defaultData;
        this.handleStartGameClick = this.handleStartGameClick.bind(this);
        this.handleRestartGameClick = this.handleRestartGameClick.bind(this);
    }

    handleStartGameClick() {
        const shuffledArray = this.shuffle(this.state.cards);
        const chunkedArray = this.chunkArray(shuffledArray, 7);

        this.setState({
            cards: shuffledArray,
            started: true,
            deck1: chunkedArray[0],
            deck2: chunkedArray[1],
            deck3: chunkedArray[2],
            lap: 1
        });
    }

    handleRestartGameClick() {
        this.setState({
            lap: 0,
            started: false,
            ended: false,
            deck1: null,
            deck2: null,
            deck3: null,
        });
    }

    chunkArray(array, chunkSize) {
        let results = [];

        while (array.length) {
            results.push(array.splice(0, chunkSize));
        }

        return results;
    }

    reorganizeCards(index) {
        const deck1 = this.state.deck1;
        const deck2 = this.state.deck2;
        const deck3 = this.state.deck3;
        let cards = null;

        if (index === 1) {
            cards = deck2.concat(deck1, deck3);
        } else if (index === 2) {
            cards = deck1.concat(deck2, deck3);
        } else if (index === 3) {
            cards = deck1.concat(deck3, deck2);
        }

        let ended = this.state.ended;
        let started = this.state.started;

        if (this.state.lap === 3) {
            ended = !ended;
            started = !started;
        }

        this.setState({
            ended: ended,
            started: started,
            cards: cards,
            deck1: [cards[0], cards[3], cards[6], cards[9], cards[12], cards[15], cards[18]],
            deck2: [cards[1], cards[4], cards[7], cards[10], cards[13], cards[16], cards[19]],
            deck3: [cards[2], cards[5], cards[8], cards[11], cards[14], cards[17], cards[20]],
            lap: this.state.lap + 1
        });
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    render() {
        return (
            <React.Fragment>
                {
                    (!this.state.started && this.state.lap === 0) ?
                    <React.Fragment>
                        <h1 style={{fontSize:'24px', fontWeight: 'bold'}}>Welcome to the game</h1>
                        <h2 style={{fontSize:'18px', fontWeight: '400'}}>Choose a card in your mind, when you're ready click on Start game.</h2>
                        <CardRow cards={this.state.cards}/>
                    </React.Fragment> : null
                }
                {
                    this.state.started ?
                    <React.Fragment>
                        <h1>The game has just started!</h1>
                        <CardRow cards={this.state.deck1}/>
                        <CardRow cards={this.state.deck2}/>
                        <CardRow cards={this.state.deck3}/>
                    </React.Fragment> : null
                }
                {
                    (!this.state.started && !this.state.ended) ?
                    <Button clicked={this.handleStartGameClick}>Start game</Button> : null
                }
                {
                    (this.state.started && !this.state.ended) ?
                    <React.Fragment>
                        <h3>In which row is your card?</h3>
                        <Button clicked={() => this.reorganizeCards(1)}>First row</Button>
                        <Button clicked={() => this.reorganizeCards(2)}>Second row</Button>
                        <Button clicked={() => this.reorganizeCards(3)}>Third row</Button>
                    </React.Fragment> : null
                }
                {
                    this.state.ended ?
                    <React.Fragment>
                        <h2>This is the card you picked, isn't it? ;-)</h2>
                        <Card number={this.state.cards[10].number} symbol={this.state.cards[10].symbol} />
                        <div>
                            <Button clicked={() => this.handleRestartGameClick()}>Restart game</Button>
                        </div>
                    </React.Fragment> : null
                }
            </React.Fragment>
        )
    }
  }

  export default Game;