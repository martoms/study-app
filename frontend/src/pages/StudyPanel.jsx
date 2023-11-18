import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IdentificationQuestions from "../components/studyPanel/IdentificationQuestions";

const StudyPanel = () => {

    const { timeStamp } = useParams();
    const studyMode = useSelector(state => state.generalState.studyModes)?.filter(set => set.timeStamp === timeStamp)[0]?.mode;
    let items = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items;

    const [currentItem, setCurrentItem] = useState(1);
    const [score, setScore] = useState(0);

    console.log(score)

    let questionsAndAnswers = items.map(item => {
        const {
            itemType,
            statement,
            answer,
            caseSensitive
        } = item;
        return (
            <>
                {
                    itemType === 'Identification' &&
                    <IdentificationQuestions
                        statement={statement}
                        answer={answer}
                        caseSensitive={caseSensitive}
                        score={score}
                        setScore={setScore}
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                    />
                }
            </>
        )
    })

    return ( 
        <div className="main-container">
            <div className="current-item">
                <p>Question</p>
                <p>{`${currentItem} of ${items.length}`}</p>
            </div>
            { questionsAndAnswers[currentItem - 1] }
        </div>
    );
}
 
export default StudyPanel;