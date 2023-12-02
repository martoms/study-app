/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useReformatDate from "../hooks/useReformatDate";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';
import exit from '../images/exit.svg';
import more from '../images/magnify-more.svg';
import less from '../images/magnify-less.svg';
import html2canvas from 'html2canvas';
import { Button } from "react-bootstrap";

const StatisticsPanel = () => {

    const { timeStamp } = useParams();
    const navigate = useNavigate();
    const setName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].setName;
    const studyData = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].studyData;
    const { dateMonthYearShort, toMMDDYY, minuteHour } = useReformatDate();
    const [chartWidth, setChartWidth] = useState(100);
    const [disableMore, setDisableMore] = useState(false);
    const [disableLess, setDisableLess] = useState(true);

    const studyStat = studyData?.map(data => ({
        ...data,
        date: toMMDDYY(data.date),
        time: minuteHour(data.date)
    }));

    const handleMagnifyMore = () => {
        if(chartWidth < 200) {
            setChartWidth(chartWidth + 10);
            setDisableLess(false);
        } else {
            setDisableMore(true);
            setDisableLess(false);
        }
    };

    const handleMagnifyLess = () => {
        if(chartWidth > 100) {
            setChartWidth(chartWidth - 10);
            setDisableMore(false);
        } else {
            setDisableLess(true);
            setDisableMore(false);
        }
    };

    const saveAsImage = () => {
        const chartContainer = document.querySelector('.chart');
        const date = `${dateMonthYearShort(new Date)}-${minuteHour(new Date)}`
        if (chartContainer) {
          html2canvas(chartContainer)
            .then((canvas) => {
              const image = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = image;
              link.download = `${setName}-${date}-study-data.png`;
              link.click();
            })
            .catch((error) => {
              console.error('Error capturing chart:', error);
            });
        }
    };
    
    useEffect(() => {
        if (chartWidth === 100) setDisableLess(true);
        if (chartWidth === 200) setDisableMore(true);
    }, [chartWidth])

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
                </div>
            );
        }
    
        return null;
    };


    return ( 
        <div className="main-container">
            <h1 className="setName">{ setName }</h1><hr />
            <h2 className="stat">Study Data</h2>
            <div className="exit stat" onClick={() => navigate(`/${timeStamp}`)}>
                <img src={exit} alt="exit" />
                Exit
            </div>
            {
                studyData ?
                <>
                <div className="magnify">
                    <span className={disableLess ? 'disable' : ''}>
                        <img className='less' src={less} alt="less" onClick={handleMagnifyLess} />
                    </span>
                    <span className={disableMore ? 'disable' : ''}>
                        <img className='more' src={more} alt="more" onClick={handleMagnifyMore} />
                    </span>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer
                        className='chart'
                        width={`${chartWidth}%`}
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
                <div className="save-chart">
                    <Button onClick={saveAsImage}>
                        Save as Image
                    </Button>
                </div>
                </>
                :
                <p className="no-data">No Data yet</p>
            }
        </div>
    );
}
 
export default StatisticsPanel;