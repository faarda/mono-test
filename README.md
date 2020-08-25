# mono-test
My solution to the mono frontend challenge app is located at https://loanwithmono.web.app/

First of all, I decided to do all my calculations within the frontend app, because I didn't want to go through the stress of managing two different applications, and the requests I had to make were pretty few, so it's quite inconsequential.

## Loan caclulation algorithm
The algorithm to calculate the offerable loan amount is located in the `services/loanCalculator.js`

Basically the idea was to calculate how much the user could repay in a month, and then multiply it by the number of months, which is fixed at 3 months, deducting the interest after that.

In a mathematical expression `(monthlyRepayable * months) - (monthlyRepayable * months) * interestRate/100`

## Calculating the monthly repayble amount
To calculate the monthly repayable amount I basiacally had to find the average of how much the user has left after every spendings in 30days and then add it to 1/10th of his average monthly income.

The logic behind this is that, we're willing to loan you one-tenth of your monthly earnings + the spare cash you have after spending in a month.

In a mathematical expression `monthlyRepayable = averageMonthlySpareCash + averageMonthlyIncome/10`

Where `averageMonthySpareCash = Σ(creditsInEvery30Days - debitInEvery30days)/numberOfMonths`

One more thing I did was to cache the user's id in the localstorage, so when he revisits we could pull that data, normally this would be in a database on the backend

I also made a little figma design for this challenge its here https://www.figma.com/file/sVn3all6qm12zXSWilQ8Sf/Untitled?node-id=0%3A1

## Widget design
So i tried to replicate the entire experience of the bater to gtb integration design, although I did this solution in the same preact project, it's basically just HTML and css, even the widget controls was written in pure javaScript in `services/widgetController`.

The css designs are in `styles/components/_widget.scss`

You can find this solution online here https://loanwithmono.web.app/widget

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and enzyme
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
