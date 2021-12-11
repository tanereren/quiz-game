import React from "react";
import Start from "./Start";
import Questions from "./Questions";
import {nanoid} from "nanoid";


export default function App(){
    const [toggled, setToggled] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [answerCheck, setAnswerCheck] = React.useState(false);
    const [score, setScore] = React.useState(0);
    
    function setToggle(){
        setToggled(!toggled)
        getData()
    }
    
    function getData(){
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(res => res.json())
            .then(data => {
                const dataArray = data.results.map(question => {
                    return {
                    question: b64ToUTF8(question.question),
                    id: nanoid(),
                    answers: [
                        ...question.incorrect_answers.map((answer) => ({
                            answer: b64ToUTF8(answer),
                            isCorrect: false,
                            isSelected: false,
                            id: nanoid()
                        })),
                        {
                            answer: b64ToUTF8(question.correct_answer),
                            isCorrect: true,
                            isSelected: false,
                            id: nanoid()
                        },
                    ].sort(() => Math.random() - 0.5)
                };
                })
                setQuestions(dataArray)
            })
    }
    
    function b64ToUTF8(str){  
        return decodeURIComponent(escape(window.atob(str)));
    }
    
    function selectAnswer(id, questionId){
        setQuestions(prevQuestions => prevQuestions.map(question => {
            return {
                ...question,
                answers: question.answers.map(quest => {
                    return (quest.id === id) ? {...quest, isSelected: !quest.isSelected} 
                    : ((quest.id !== id) && (question.id === questionId)) ? {...quest, isSelected: false} 
                    : quest
                })
            }
        })
        )
    }
        
    const triviaData = questions.map(trivia => {
        return (
            <Questions
                check={answerCheck}
                key={trivia.id}
                question={trivia.question}
                answer={trivia.answers}
                questionId={trivia.id}
                handleClick={selectAnswer}
            />
        )
    })
    
    function submit(){
        if(!answerCheck){
            questions.forEach(question => {
                question.answers.forEach(answers => {
                    return ((answers.isSelected) && (answers.isCorrect)) 
                    ? (setAnswerCheck(true), setScore(prevScore => prevScore + 1)) 
                    : ((answers.isSelected) && (!answers.isCorrect)) 
                    ? (setAnswerCheck(true), setScore(prevScore => prevScore)) : score
                })
            })
        } else {
            setScore(0);
            setAnswerCheck(false);
            getData();
        }
    }

    
    return (
        <div>
            {toggled ? 
            
            <div className="container">
                {triviaData}
                <span className="submit-btn-container">
                <button className="submit-btn"
                onClick={submit}>{answerCheck ? "New Game" : "Check Score!"}</button>
                {answerCheck && <p className="rainbow rainbow_text_animated">You scored: {score}/5</p>}
                </span>
            </div>
            
            : <Start handleClick={setToggle} />
            
            }
            
        </div>
        
    )
}