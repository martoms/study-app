import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { PureComponent } from 'react';
import useReformatDate from "../hooks/useReformatDate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatisticsPanel = () => {

    const { timeStamp } = useParams();
    const setName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].setName;
    const studyData = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].studyData;
    const { toMMDDYY, minuteHour } = useReformatDate();

    const studyStat = studyData.map(data => ({
        ...data,
        // date: toMMDDYY(data.date)
        date: `${toMMDDYY(data.date)} ${minuteHour(data.date)}`
      }));
    // console.log(Math.max(...studyStat.map(data => data.items)))
    // console.log(studyStat.map(data => typeof data.items))


    return ( 
        <div className="main-container">
            <h1 className="setName">{ setName }</h1><hr />
            <div className="chart-container">
                <ResponsiveContainer
                 className='chart'
                 width='100%'
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
                        <Tooltip />
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