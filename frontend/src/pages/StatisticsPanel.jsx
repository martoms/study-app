/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { PureComponent } from 'react';
import useReformatDate from "../hooks/useReformatDate";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';

const StatisticsPanel = () => {

    const { timeStamp } = useParams();
    const setName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].setName;
    const studyData = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].studyData;
    const { toMMDDYY, minuteHour } = useReformatDate();

    const studyStat = studyData.map(data => ({
        ...data,
        date: toMMDDYY(data.date),
        time: minuteHour(data.date)
      }));
    console.log(studyStat)

    const CustomTooltip = ({ active, payload, label }) => {


    if (active && payload && payload.length) {

        const time = payload[0].payload.time;
        const hours = payload[0].payload.elapsedTime.hours;
        const minutes = payload[0].payload.elapsedTime.minutes;
        const seconds = payload[0].payload.elapsedTime.seconds;
        const percent = ((payload[1].value / payload[0].value) * 100).toFixed(1);

            return (
                <div className="custom-tooltip">
                    <p className="date">{ label }</p>
                    <p className="time">{ time }</p><hr />
                    <p className="items">items: <span>{ payload[0].value }</span></p>
                    <p className="score">score: <span>{ payload[1].value }</span></p>
                    <p className="percent">percent: <span>{ `${percent}%` }</span></p>
                    <p className="duration">{`duration: `}
                        <span className="days">{ hours !== 0 ? hours === 1 ? `${hours} hr, ` : `${hours} hrs, ` : ''}</span>
                        <span className="minutes">{ minutes !== 0 ? minutes === 1 ? `${minutes} mins, and ` : `${minutes} mins, and ` : ''}</span>
                        <span className="seconds">{ seconds !== 0 ? seconds === 1 ? `${seconds} sec` : `${seconds} secs` : ''}</span>
                    </p>
                    {console.log(payload)}
                </div>
            );
        }
    
        return null;
    };


    return ( 
        <div className="main-container">
            <h1 className="setName">{ setName }</h1><hr />
            <h2 className="stat">Study Data</h2>
            <div className="chart-container">
                <ResponsiveContainer
                 className='chart'
                 width={`${100}%`}
                 >
                    <BarChart
                        width={500}
                        height={300}
                        data={studyStat}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="items" stackId="a" fill="#8884d8" />
                        <Bar dataKey="score" stackId="b" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
 
export default StatisticsPanel;