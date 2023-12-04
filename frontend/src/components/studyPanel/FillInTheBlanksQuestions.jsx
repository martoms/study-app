/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import correct from '../../images/correct.svg';
import wrong from '../../images/wrong.svg';

const FillInTheBlanksQuestions = ({
    items,
    statement,
    blanks,
    caseSensitive,
    score,
    setScore,
    currentItem,
    setCurrentItem,
    handleComplete
}) => {

    const [next, setNext] = useState(false);
    const [showCorrectAns, setShowCorrectAns] = useState(false);
    const answers = blanks.map(blank => blank.split(',').map(answer => answer.trim()));
    const insensitive = answers.map(answer => answer.map(alt => alt.toLowerCase()))
    const question = document.querySelector('.statement');
    const inputs = document.querySelectorAll('.statement input');
    const userAnswer = Object.values(inputs).map(item => item.value);
    const [finalAnswer, setFinalAnswer] = useState([]);
    const [remarks, setRemarks] = useState([]);

    useEffect(() => {
        if (!showCorrectAns && question) question.innerHTML = statement.replaceAll('BLANK', '<input type="text" />');
        if (showCorrectAns && question) {
            let i = -1;
            question.innerHTML = statement.replace(/BLANK/g, (() => {
                i++
                return `
                    <span class="${remarks[i]}">${finalAnswer[i]}</span>
                `
            }))
        }
    }, [question, finalAnswer])

    const correctAnswers = answers.map((answer, i) => {
        return (
            <div className="answer" key={i}>
                <span>{i + 1}</span>
                {answer.map((alt, j) => (
                    <span key={j}>
                        { alt }
                    </span>
                ))}
            </div>
        )
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let currentScore = 0;
        let currentRemark = [];
        if (caseSensitive) {
            userAnswer.forEach((answer, i) => {
                if (answers[i].includes(userAnswer[i])) {
                    currentScore += 1;
                    currentRemark.push('correct');
                } else {
                    currentRemark.push('wrong');
                }
            })
        } else {
            userAnswer.forEach((answer, i) => {
                if (insensitive[i].includes(userAnswer[i].toLowerCase())) {
                    currentScore += 1;
                    currentRemark.push('correct');
                } else {
                    currentRemark.push('wrong');
                }
            })
        }
        setFinalAnswer(userAnswer);
        setScore(score + currentScore);
        setRemarks(currentRemark);
        setShowCorrectAns(true);
        setNext(true);
    };

    const handleNext = () => {
        // set delay to prevent clicking submit
        setTimeout(() => {
            setShowCorrectAns(false);
            setNext(false);
            setCurrentItem(currentItem + 1);
        }, 1)
    };

    return ( 
        <div className="question-and-answer fill-in-the-blanks-questions">
            <div className="user-answer">
                <Form onSubmit={handleSubmit} >
                    <div className="statement"></div>
                    {
                        !showCorrectAns ?
                        <>
                        
                        <Button
                            type="button"
                            className="submit-answer d-none d-md-inline-block"
                            onClick={handleSubmit}
                            disabled={!userAnswer}
                        >
                        Submit
                        </Button>
                        </>
                        :
                        <div className="final-answer">
                            {/* {
                                (
                                    caseSensitive ?
                                    answers.includes(userAnswer.trim())
                                    :
                                    insensitive.includes(userAnswer.trim().toLocaleLowerCase())
                                )
                                ?
                                <div className="correct">
                                    <div className="answer">
                                        {userAnswer}
                                    </div>
                                    <img src={correct} alt="correct" />
                                </div>
                                :
                                <div className="wrong">
                                    <div className="answer">
                                        {userAnswer}
                                    </div>
                                    <img src={wrong} alt="wrong" />
                                </div>
                            } */}
                            {
                                next && currentItem === items.length ?
                                <Button
                                    type="button"
                                    className="complete"
                                    onClick={handleComplete}
                                >
                                Complete
                                </Button>
                                :
                                <Button
                                    type="button"
                                    className="next-answer"
                                    // onClick={handleNext}
                                >
                                Next
                                </Button>
                            }
                        </div>
                    }
                    {
                        showCorrectAns &&
                        <div className="correct-answer">
                            {
                                answers[0].length === 1 ?
                                <p>Correct Answer</p>
                                :
                                <p>Correct Answers</p>
                            }
                            {
                                caseSensitive && 
                                <p className="case-sensitive">
                                    {`(Case Sensitive)`}
                                </p>
                            }
                            <hr />
                            <div className="display-answers fill-in-the-blanks">
                                { correctAnswers }
                            </div>
                        </div>
                    }
                    <div className="buttons d-md-none">
                        {
                            next && currentItem === items.length ?
                            <Button
                                type="button"
                                className="complete"
                                onClick={handleComplete}
                            >
                            Complete
                            </Button>
                            :
                            next ?
                            <Button
                                type="button"
                                className="next-answer"
                                onClick={handleNext}
                            >
                            Next
                            </Button>
                            :
                            <Button
                                type="submit"
                                className="submit-answer"
                                onClick={handleSubmit}
                                disabled={!userAnswer}
                            >
                            Submit
                            </Button>
                        }
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default FillInTheBlanksQuestions;