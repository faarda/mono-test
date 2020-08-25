import { nearestThousand } from './utilities'

const interestRate = 0.1;

const calculateLoan = (transactionHistory, requestedAmount) => {
    return new Promise((resolve) => {
        let offerableLoan = {};
        const loanDuration = 3;

        //get credit difference for each month
        const monthlyCreditsAndDebits = getMonthlyCreditsAndDebits(transactionHistory)

        //get the average of the months
        const averageCredits = getAverage(monthlyCreditsAndDebits.map(data => data.credits));
        const averageDifference = getAverage(monthlyCreditsAndDebits.map(data => data.difference));

        //get offerable loan
        const monthlyRepayable = averageDifference + (averageCredits/10)
        const requestedMonthlyRepayable = (toKobo(requestedAmount) + (toKobo(requestedAmount)*interestRate))/loanDuration;

        if(requestedMonthlyRepayable <= monthlyRepayable) {
            offerableLoan = {
                amount: nearestThousand(toKobo(requestedAmount)),
                monthlyRepayable: nearestThousand(requestedMonthlyRepayable)
            }
        }else {
            let loanAmount = monthlyRepayable * loanDuration;
            loanAmount = loanAmount - (interestRate * loanAmount)

            offerableLoan = {
                amount: nearestThousand(loanAmount),
                monthlyRepayable: nearestThousand(monthlyRepayable)
            }
        }

        resolve(offerableLoan);
    });
}

const creditsAndDebits = [];
const getMonthlyCreditsAndDebits = (history) => {
    history.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        const today = new Date()
        const monthDays = 31;

        //determine transaction month
        const dateDifference = (Math.abs(today - transactionDate)) / (1000 * 3600 * 24);

        const month = Math.floor(dateDifference/monthDays);

        //record users credit-debit difference and credits for each month
        if(creditsAndDebits[month]){
            if(transaction.type === 'credit') {
                creditsAndDebits[month].credits += parseInt(transaction.amount, 10);
                creditsAndDebits[month].difference += parseInt(transaction.amount, 10);
            } else {
                creditsAndDebits[month].difference -= parseInt(transaction.amount, 10);
            }
        }else{
            creditsAndDebits[month] = {
                credits: transaction.type === 'credit' ? parseInt(transaction.amount, 10) : 0,
                difference: transaction.type === 'credit' ? parseInt(transaction.amount, 10) : parseInt(-transaction.amount, 10)
            }
        }
    });

    return creditsAndDebits;
}

const getAverage = (data) => {
    const sum = data.reduce((sum, value) => sum + value, 0);

    const average = sum/data.length;

    return Math.floor(average);
}

const toKobo = (amount) => {
    return amount*100;
}


export const monthlyRepayable = (amount, duration) => {
    return parseInt((amount + (amount * interestRate))/duration, 10);
}


export default calculateLoan;