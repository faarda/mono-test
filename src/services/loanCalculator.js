const calculateLoan = (transactionHistory, requestedAmount) => {
    return new Promise((resolve, reject) => {
        //get monthly transactions array
        let offerableLoan = {};
        const interestRate = 0.1;
        const loanDuration = 6;
        const monthlyTransactions = getMonthlyTransactions(transactionHistory);

        //calculate credit difference for each month
        const monthlyCreditDebitDifferenceAndCredits = getMonthlyCreditDebitDifferenceAndCredits(monthlyTransactions);
        console.log(monthlyCreditDebitDifferenceAndCredits)

        //get the average of the months
        const credits = monthlyCreditDebitDifferenceAndCredits.map(data => data.credits);
        const difference = monthlyCreditDebitDifferenceAndCredits.map(data => data.difference);
        const averageCredits = getAverage(credits);
        const averageDifference = getAverage(difference);

        //get offerable loan

        const monthlyRepayable = averageDifference + (averageCredits/10)
        const requestedMonthlyRepayable = (toKobo(requestedAmount) + (toKobo(requestedAmount)*interestRate))/loanDuration;

        if(requestedMonthlyRepayable <= monthlyRepayable){
            offerableLoan = {
                amount: requestedAmount,
                monthlyRepayable: requestedMonthlyRepayable
            }
        }else{
            let loanAmount = monthlyRepayable * loanDuration;
            loanAmount = loanAmount - (interestRate * loanAmount)

            offerableLoan = {
                amount: loanAmount,
                monthlyRepayable
            }
        }

        resolve(offerableLoan);
    });
}

const getMonthlyTransactions = (history) => {
    const monthlyTransactions = [];

    history.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        const today = new Date()
        const monthDays = 30;

        const dateDifference = (today.getTime() - transactionDate.getTime()) / (1000 * 3600 * 24);

        const month = Math.floor(dateDifference/monthDays);

        if(!monthlyTransactions[month]){
            monthlyTransactions[month] = [];
        }

        monthlyTransactions[month].push(transaction)
    });

    return monthlyTransactions;
}

const getMonthlyCreditDebitDifferenceAndCredits = (monthlyTransactions) => {
    return monthlyTransactions.map(month => {
        const credits = month.reduce((sum, transaction) => {
            if(transaction.type == "credit"){
                return sum + transaction.amount
            }

            return sum + 0;
        }, 0)

        const difference = month.reduce((diff, transaction) => {
            if(transaction.type == "debit"){
                return diff - transaction.amount
            }

            return diff + transaction.amount
        }, 0)

        return {
            credits,
            difference
        }
    })
}

const getAverage = (data) => {
    const sum = data.reduce((sum, value) => {
        return sum + value;
    }, 0);

    const average = sum/data.length;

    return average;
}

const toKobo = (amount) => {
    return amount*100;
}

export const getNaira = (amount) => {
    const nairaValue = Math.ceil(amount / 100);
    const formattedAmount =  nairaValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `₦${formattedAmount}`;
}

// const toNaira = (amount) => {
//     return amount*100;
// }

// const get


export default calculateLoan;