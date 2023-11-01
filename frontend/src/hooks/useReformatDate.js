const useReformatDate = () => {

    const dateMonthYear = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const minuteHour = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', { minute: 'numeric', hour: 'numeric' });
    };

    return { dateMonthYear, minuteHour }
}
 
export default useReformatDate;