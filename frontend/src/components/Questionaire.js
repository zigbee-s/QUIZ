import React from 'react'

export const Questionaire = ({PostAnswer, data: {question, choices}}) => {   

    console.log(question);

    return (
        <div>
            <h1>{question}</h1> 
            <button value={choices[0]} onClick = {PostAnswer}>{choices[0]}</button>
            <button value={choices[1]} onClick = {PostAnswer}>{choices[1]}</button>
            <button value={choices[2]} onClick = {PostAnswer}>{choices[2]}</button>
            <button value={choices[3]} onClick = {PostAnswer}>{choices[3]}</button>
        </div>
    )
}
