import React from "react";
import Card from "./Card";

const CardRow = (props) => {
    let cards = props.cards.map((card, index) => {
        return <Card number={card.number} symbol={card.symbol} key={index}/>;
    });
    
    return (
        <div>
            {cards}
        </div>
    );
}

export default CardRow;