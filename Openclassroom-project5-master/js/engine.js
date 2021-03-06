'use strict';

//Create an Objects and Prototypes using this keyword to reference the elements
//Reference user interface
const QuoteGenerator = function (wrapperID, quoteStore) {
    this._selectors = {
        'startButton': '.start',
        'resultWrapper': '.generatorOutPut',
        'quoteAmount': '.number',
        'quoteTitle': '.subject'
    };

    this.quoteStore = quoteStore;
    this.wrapper = document.getElementById(wrapperID);
    this.startButton = this.wrapper.querySelector(this._selectors.startButton);
    this.displayArea = this.wrapper.querySelector(this._selectors.resultWrapper);
    this.quoteTitleList = this.wrapper.querySelector(this._selectors.quoteTitle);
};
//Update values for selected number and types of quote
QuoteGenerator.prototype.updateValues = function() {
    this.quoteAmount = this.wrapper.querySelector(this._selectors.quoteAmount).value;
    this.quoteTitleID = this.wrapper.querySelector(this._selectors.quoteTitle).value;
};
//Generating Quote List from the quote store by option
QuoteGenerator.prototype.generateThemeList = function() {
    let i = 0;

    while (this.quoteStore.quoteList.length > i) {
        const newTitleOption = document.createElement('option');
        newTitleOption.text = this.quoteStore.quoteList[i].name;
        newTitleOption.value = i;

        this.quoteTitleList.add(newTitleOption);

        i++;
    }
};
//Make Quote generator give randomly quotes
QuoteGenerator.prototype.randomNumber = function() {
    return Math.floor(Math.random() * 3);
};

QuoteGenerator.prototype.cleanText = function() {
    this.displayArea.innerHTML = '';
};
//Quote store work flow randomly
QuoteGenerator.prototype.generateQuote = function() {
    const beginningQuoteIndex = this.randomNumber();
    const middleQuoteIndex = this.randomNumber();
    const endQuoteIndex = this.randomNumber();

    const beginning = this.quoteStore.get(this.quoteTitleID).beginnings[beginningQuoteIndex];
    const middle = this.quoteStore.get(this.quoteTitleID).middles[middleQuoteIndex];
    const end = this.quoteStore.get(this.quoteTitleID).ends[endQuoteIndex];

    return new Quote(beginning, middle, end);
};
//Display quotes by Pressing button and update quotes and clean text in display area
QuoteGenerator.prototype.displayQuotes = function() {
    this.startButton.addEventListener('click', function () {
        this.cleanText();
        this.updateValues();

        let i = 1;

        while (this.quoteAmount >= i) {
            const newQuote = this.generateQuote();

            this.displayArea.innerHTML = this.displayArea.innerHTML + '<p>' + newQuote.beginning + newQuote.middle + newQuote.end + '</p>';

            i++;
        }
    }.bind(this))
};
