import React from "react";

const Card = (props) => {
    let icon = null;

    if (props.symbol === 'ace') {
        icon = 'https://image.flaticon.com/icons/svg/105/105223.svg';
    } else if (props.symbol === 'clover') {
        icon = 'https://image.flaticon.com/icons/svg/1496/1496341.svg';
    } else if (props.symbol === 'diamond') {
        icon = 'https://image.flaticon.com/icons/svg/148/148905.svg';
    } else {
        icon = 'https://image.flaticon.com/icons/svg/148/148836.svg';
    }

    return (
        <div className="Card">
            <p className="Paragraph">
                <b>{props.number}</b>
            </p>
            <img className="Center" src={icon} alt="card symbol" height="50px" width="50px"></img>
        </div>
    );
}

export default Card;