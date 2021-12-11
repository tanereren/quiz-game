import React from "react";

export default function Start(props){
    return (
        <>
        <div className="start-container">
            <h1>Quizzical</h1>
            <button onClick={props.handleClick}>Start Game!</button>
        </div>
        <svg className="start-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#a2d9ff" fill-opacity="1" d="M0,96L1440,288L1440,320L0,320Z"></path>
        </svg>
        </>
    )
}