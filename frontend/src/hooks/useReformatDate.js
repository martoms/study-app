const useReformatDate = () => {

    const dateMonthYearLong = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const dateMonthYearShort = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const toMMDDYY = (dateString) => {
        const month = (new Date(dateString).getMonth() + 1).toString().padStart(2, '0'); 
        const day = new Date(dateString).getDate().toString().padStart(2, '0');
        const year = new Date(dateString).getFullYear().toString().slice(-2);
      
        return `${month}/${day}/${year}`;
    }

    const minuteHour = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', { minute: 'numeric', hour: 'numeric' });
    };

    return { dateMonthYearLong, dateMonthYearShort, toMMDDYY, minuteHour }
}
 
export default useReformatDate;