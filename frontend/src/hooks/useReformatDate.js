const useReformatDate = () => {

    const dateMonthYearLong = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const dateMonthYearShort = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const minuteHour = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', { minute: 'numeric', hour: 'numeric' });
    };

    return { dateMonthYearLong, dateMonthYearShort, minuteHour }
}
 
export default useReformatDate;