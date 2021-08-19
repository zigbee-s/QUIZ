import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { Questionaire } from './Questionaire';
import quesData from "../data/questions";


const Quiz = () => {
    const [user, setUser] = useState({});
    const [questions, setQuestions] = useState(quesData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const history = useHistory();
    
    const callQuizPage = async ()=>{
        try {
            const response = await fetch('/quiz',{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            
            if(!response.status === 200){     
                const error = new Error(response.error); 
                throw error;  
            }
            
            setUser(data);
            setScore(data.score);
            setCurrentIndex(data.answers.length);
            setQuizEnded(data.quizEnded);
                    
        } catch (error) {
            history.push('/signin');    
            console.log(error);
        }
    }   

    const PostAnswer = async (e) =>{
        e.preventDefault();
        
        let answer = e.target.value;
        
        const {email} = user;
        
        let newScore = score;
        
        if(answer === questions[currentIndex].answer){
             newScore = score+1;
        }

        //Getting data from a get request
        try {
            const response = await fetch('/quiz',{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            
            if(!response.status === 200){     
                const error = new Error(response.error); 
                throw error;  
            }
            
            
            if(currentIndex <= data.answers.length -1){
                console.log("dsfds");
                setCurrentIndex(data.answers.length);    
                setScore(data.score);
                setQuizEnded(data.quizEnded);            
            }else{
                 //Post Answer
                    const res = await fetch("/answer", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email, answer, newScore,quizEnded
                        })            
                    })

                    const data = await res.json();

                    if(data.message = "Answer added"){
                        setCurrentIndex(data.currentIndex + 1);
                        setScore(data.score);         
                    }
                }
                    
        } catch (error) {
            history.push('/signin');    
            console.log(error);
        }



       
    }

    useEffect(() => {
        setQuestions(quesData);
        callQuizPage();

    }, []); 

  
    return quizEnded ? (
        <h1>Your score was {score} </h1>
        ) : questions.length > currentIndex ? (
        <>
          {<Questionaire user data ={questions[currentIndex]} PostAnswer = {PostAnswer}></Questionaire>}
        </>
    ) : (
        <h1>2 Your score was {score} </h1>
    );
}

export default Quiz;