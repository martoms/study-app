/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IdentificationQuestions from "../components/studyPanel/IdentificationQuestions";

const StudyPanel = () => {

    const { timeStamp } = useParams();
    const studyMode = useSelector(state => state.generalState.studyModes)?.filter(set => set.timeStamp === timeStamp)[0]?.mode;
    let studyItems = [...useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items];
    const [items, setItems] = useState([]);

    useEffect(() => {
        switch (studyMode) {
            case 'reversed':
                const reversedItems = studyItems.sort((a,b) => b.createdOn - a.createdOn);
                setItems(reversedItems)
                break;
            case 'random':
                let randomItems = [...studyItems]; // Create a copy of the original array
                for (let i = 0; i < studyItems.length; i++) {
                    let randomIndex = Math.floor(Math.random() * randomItems.length);
                    let randomItem = randomItems[randomIndex];
                    randomItems.splice(randomIndex, 1); // Remove the selected item from the copy
                    studyItems[i] = randomItem; // Assign the selected item to the original array
                }
                setItems(studyItems)
                break;
            default:
                setItems(studyItems);
        }
    }, [])

    const [currentItem, setCurrentItem] = useState(1);
    const [score, setScore] = useState(0);

    let questionsAndAnswers = items?.map(item => {
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