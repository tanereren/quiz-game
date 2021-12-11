import React from "react";

export default function Questions(props){
    const answerButtons = props.answer.map(answers => {
        const styles = {
            backgroundColor: answers.isSelected ? "#59E391" : "white"
        }
        const checkStyle = {
            backgroundColor: 
            answers.isSelected && answers.isCorrect ? "#77d48a"
            : answers.isSelected && !answers.isCorrect ? "#ed9898"
            : !answers.isSelected && answers.isCorrect ? "#76f590"
            : "none",
            opacity: !answers.isCorrect ? "0.65" : "1",
            pointerEvents: "none"
        }
        return (
            <>
            <button
                className="quiz-btn"
                style={props.check ? checkStyle : styles}
                key={answers.id}
                onClick={() => props.handleClick(answers.id, props.questionId)}
            >
            {answers.answer}
            </button>
            </>
        )
    })
    
    return (
        <div className="questions-container">
            <h4>{props.question}</h4>
            <span>{answerButtons}</span>
        </div>
    )
}