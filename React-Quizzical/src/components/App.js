import React from "react";
import Quiz from "./Quiz";
import {nanoid} from 'nanoid'
import he from 'he'

export default function App(){
    let [question, setQuestion] = React.useState(() => [])
    let [score, setScore] = React.useState(0)
    let [quiz, setQuiz] = React.useState(false)
    let [start, setStart] = React.useState(false)
    let [effects, setEffects] = React.useState(false)

    React.useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple')
            .then(res => res.json())
            .then(data => setQuestion(data.results.map(question => {
                return ({
                    id: nanoid(),
                    question: question.question,
                    options: [...question.incorrect_answers,  question.correct_answer].sort(()=> Math.random() - 0.5),
                    correct_answer: he.decode(question.correct_answer),
                    selected: ''
                })
            } )) )
    }, [effects])

    function toggleAns(event){
        let {value, id} = event.target
        setQuestion(prevQuestion => prevQuestion.map(question => {
            return question.id === id ? {...question, selected:value}: question
        }))
    }

    function scoreSet(){
        let scored = 0
       question.map(question => {
        if(question.selected === question.correct_answer){
            scored = scored + 1
        }
        setScore(scored)
        setQuiz( quiz => !quiz)
       })
    }

    function changeEffects(){
        setEffects(prevEffects => !prevEffects)
        setStart(true)
    }

    function startQuiz(){
        setStart(prevStart => !prevStart)
        setQuiz(false)
    }

   let theQuiz = question.map(qs => {
    let cordo = qs.options
    let bip = cordo.map(ans => {
        let answerString = he.decode(ans)
        return(
            <div className="ansa" key={ans} >
                <input
                    className="puts"
                    type="radio"
                    value={answerString}
                    onChange={toggleAns}
                    name = {qs.id}
                    id = {qs.id}
                />
                <label className={quiz ? (he.decode(ans) === qs.correct_answer ? 'active': (he.decode(ans) === qs.selected ? 'checka':'puts')): '' }>
                    {answerString}
                </label>
                
            </div>
            )
    })
        return(
            <div className="rend">
                <Quiz
                    question = {he.decode(qs.question)}
                    key = {qs.id}
                    id = {qs.id}
                />
                <div className="bips">
                    {bip}
                </div>
                <div className="qBar"></div>
            </div>
        )
    })

    let startPage = 
        <div className="start_page">
            <img className="start_yellow" src={`${process.env.PUBLIC_URL}/asset/images/yellow.png`} alt="" />
            <h3>Quizzical</h3>
            <p>So You Think You Know It All?</p>
            <button className="startBtn" onClick={changeEffects}>Start Quiz</button>
            <img className="start_blue" src={`${process.env.PUBLIC_URL}/asset/images/blue.svg`} alt="" />
        </div>

    let quizPage = 
        <div className="quiz_page">
            <img className="quiz_yellow" src={`${process.env.PUBLIC_URL}/asset/images/yellow.png`} alt="" />
            {theQuiz}
            <div className="result_section">
                {quiz && <h1>You scored {score}/5 correct answer{score>1 ? 's':''}</h1>}
                <button className="checking" onClick={quiz ? startQuiz: scoreSet}>{quiz ? 'Play Again': 'Check Answers'}</button>
            </div>
            <img className="quiz_blue" src={`${process.env.PUBLIC_URL}/asset/images/blue.svg`} alt="" />
        </div>
    return(
        <div className="app">
            {start ? quizPage: startPage}
        </div>
    )
}