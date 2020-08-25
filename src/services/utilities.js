export const getNaira = (amount) => {
    const nairaValue = parseFloat(amount / 100);
    const formattedAmount =  nairaValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // console.log(formatte)
    return formattedAmount;
}

export const getRealValue = (amount) => {
    const cleanAmount = amount.toString().replace(/,/g, "");
    return parseFloat(cleanAmount) || 0;
}


export const getTime = (date) => {
    
    date = date ? new Date(date) : new Date();	
      
    const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
    ];
    
    const hourNames = ['12','01', '02', '03','04','05','06','07','08','09','10','11']
    
    const day = date.getDate().toString();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    
    const hh = date.getHours().toString();
    const minute = date.getMinutes().toString();

    const amPm = hh >= 12 ? 'PM' : 'AM';
    const hour = hh % 12;

    return `${monthNames[monthIndex]} ${day}, ${year} ${hourNames[hour - 1]}:${minute > 9 ? minute : '0' + minute + amPm}`;
}

export const nearestThousand = (amount) => {
    return Math.round(amount/100000)*100000
}