/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addStudyData } from "../features/studySet/studySetSlice";
import IdentificationQuestions from "../components/studyPanel/IdentificationQuestions";
import { useStopwatch } from 'react-timer-hook';
import StudySummary from "../components/studyPanel/StudySummary";
import exit from '../images/exit.svg';
import ExitWarning from "../components/modals/ExitWarning";

const StudyPanel = () => {

    const { timeStamp } = useParams();
    const dispatch = useDispatch();
    const studyMode = useSelector(state => state.generalState.studyModes)?.filter(set => set.timeStamp === timeStamp)[0]?.mode;
    let studyItems = [...useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items];
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(1);
    const [score, setScore] = useState(0);
    const [showStudySummary, setShowStudySummary] = useState(false);
    const [showExitWarning, setShowExitWarning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const updateElapsedTime = () => {
        setElapsedTime({ hours, minutes, seconds })
    };

    const handleCloseExitWarning = () => setShowExitWarning(false);
    const handleShowExitWarning = () => setShowExitWarning(true);

    const handleComplete = () => {
        const studyData = {
            timeStamp,
            date: Date.now(),
            elapsedTime,
            items: items.length,
            score
        }
        pause();
        setShowStudySummary(true);
        dispatch(addStudyData(studyData));
    };

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        isRunning,
        pause,
    } = useStopwatch({ autoStart: true });

    useEffect(() => {
        updateElapsedTime();
    }, [totalSeconds, isRunning])

    useEffect(() => {
        switch (studyMode) {
            case 'reversed':
                const reversedItems = studyItems.sort((a,b) => b.createdOn - a.createdOn);
                setItems(reversedItems)
                break;
            case 'random':
                let randomItems = [...studyItems];
                for (let i = 0; i < studyItems.length; i++) {
                    let randomIndex = Math.floor(Math.random() * randomItems.length);
                    let randomItem = randomItems[randomIndex];
                    randomItems.splice(randomIndex, 1); 
                    studyItems[i] = randomItem;
                }
                setItems(studyItems)
                break;
            default:
                setItems(studyItems);
        }
    }, [])

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
                        items={items}
                        statement={statement}
                        answer={answer}
                        caseSensitive={caseSensitive}
                        score={score}
                        setScore={setScore}
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                        handleComplete={handleComplete}
                    />
                }
            </>
        )
    })

    return ( 
        <div className="main-container">
            {
                !showStudySummary ?
                <>
                <div className="current-item">
                    <p>Question</p>
                    <p>{`${currentItem} of ${items.length}`}</p>
                </div>
                <div className="timer">
                    {
                        hours !== 0 &&
                        <span className="hours">{ String(elapsedTime.hours).length === 1 ? `0${elapsedTime.hours}` : elapsedTime.hours }</span>
                    }
                    <span className="minutes">{ String(elapsedTime.minutes).length === 1 ? `0${elapsedTime.minutes}` : elapsedTime.minutes }</span>
                    <span className="seconds">{ String(elapsedTime.seconds).length === 1 ? `0${elapsedTime.seconds}` : elapsedTime.seconds }</span>
                </div>
                <div className="exit" onClick={handleShowExitWarning}>
                    <img src={exit} alt="exit" />
                    Exit
                </div>
                { questionsAndAnswers[currentItem - 1] }
                </>
                :
                <StudySummary
                    
                />
            }
            <ExitWarning
                showExitWarning={showExitWarning}
                handleCloseExitWarning={handleCloseExitWarning}
            />
        </div>
    );
}
 
export default StudyPanel;