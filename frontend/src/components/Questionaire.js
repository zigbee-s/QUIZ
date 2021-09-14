import React from 'react'
import './CSS Files/ques.css';
export const Questionaire = ({PostAnswer, data: {question, choices}}) => {   

    return (
        <div className="box box-shadow">
            <h3>{question}</h3> 
            <div className = 'ques-box'>
            <button className = 'button-ques' value={choices[0]} onClick = {PostAnswer}>{choices[0]}</button>
            <br/>
            <button className = 'button-ques' value={choices[1]} onClick = {PostAnswer}>{choices[1]}</button>
            <br/>
            <button className = 'button-ques' value={choices[2]} onClick = {PostAnswer}>{choices[2]}</button>
            <br/>
            <button className = 'button-ques' value={choices[3]} onClick = {PostAnswer}>{choices[3]}</button>
            <br/>
            </div>
        </div>
    )
}
