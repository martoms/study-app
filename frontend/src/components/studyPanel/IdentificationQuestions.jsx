/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import correct from '../../images/correct.svg';
import wrong from '../../images/wrong.svg';

const IdentificationQuestions = ({
    items,
    statement,
    answer,
    caseSensitive,
    score,
    setScore,
    currentItem,
    setCurrentItem,
    handleComplete
}) => {

    const [next, setNext] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [showCorrectAns, setShowCorrectAns] = useState(false);
    const answers = answer.split(',').map(answer => answer.trim());
    const insensitive = answers.map(answer => answer.toLowerCase())

    const correctAnswers = answers.map((answer, i) => {
        return (
            <span key={i}>
                { answer }
            </span>
        )
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (caseSensitive) {
            if (answers.includes(userAnswer)) {
                setScore(score + 1)
            }
        } else {
            if (insensitive.includes(userAnswer.toLowerCase())) {
                setScore(score + 1)
            }
        }
        setShowCorrectAns(true);
        setNext(true);
    };

    const handleNext = () => {
        // set delay to prevent clicking submit
        setTimeout(() => {
            setShowCorrectAns(false);
            setUserAnswer('');
            setNext(false);
            setCurrentItem(currentItem + 1);
        }, 1)
    };

    return ( 
        <div className="question-and-answer identification-questions">
            <div className="statement">
                { statement }
            </div>
            <div className="user-answer">
                <Form onSubmit={handleSubmit}>
                    {
                        !showCorrectAns ?
                        <Form.Group className="form-group">
                            <Form.Control
                                className="input-answer d-md-inline-block"
                                value={userAnswer}
                                placeholder="Answer..."
                                onChange={(e) => setUserAnswer(e.target.value)}
                                autoFocus
                            />
                            <Button
                                type="submit"
                                className="submit-answer d-none d-md-inline-block"
                                onClick={handleSubmit}
                                disabled={!userAnswer}
                            >
                            Submit
                            </Button>
                        </Form.Group>
                        :
                        <div className="final-answer">
                            {
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
                            }
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
                                    onClick={handleNext}
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
                                answers.length === 1 ?
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
                            <div className="display-answers">
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
 
export default IdentificationQuestions;