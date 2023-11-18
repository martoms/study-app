/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import correct from '../../images/correct.svg';
import wrong from '../../images/wrong.svg';

const IdentificationQuestions = ({statement, answer, caseSensitive}) => {

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
        setShowCorrectAns(true);
        setNext(true);
    };

    const handleNext = () => {
        // set delay to prevent clicking submit
        setTimeout(() => {
            setShowCorrectAns(false);
            setUserAnswer('');
            setNext(false);
        }, 1)
    }

    return ( 
        <div className="question-and-answer identification-questions">
            <div className="statement">
                { statement }
            </div>
            <div className="user-answer">
                <Form onSubmit={handleSubmit}>
                    {
                        !showCorrectAns ?
                        <Form.Control
                            value={userAnswer}
                            placeholder="Answer..."
                            onChange={(e) => setUserAnswer(e.target.value)}
                            autoFocus
                        />
                        :
                        (
                            caseSensitive ?
                            answers.includes(userAnswer.trim())
                            :
                            insensitive.includes(userAnswer.trim().toLocaleLowerCase())
                        )
                        ?
                        <div className="final-answer correct">
                            <div className="answer">
                                {userAnswer}
                            </div>
                            <img src={correct} alt="correct" />
                        </div>
                        :
                        <div className="final-answer wrong">
                            <div className="answer">
                                {userAnswer}
                            </div>
                            <img src={wrong} alt="wrong" />
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
                    <div className="buttons">
                        {
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