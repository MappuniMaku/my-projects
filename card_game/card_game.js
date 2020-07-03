'use strict';

let cardGame = {

    arr: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
    cardsOpened: 0,
    valueCard1: undefined,
    valueCard2: undefined,
    idCard1: undefined,
    idCard2: undefined,
    progress: 0,
    defeatTimerId: undefined,

    shuffle(array)
    {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex)
        {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        };

        return array;
    },

    setBackgroundImages() {
        this.arr.forEach( (item, index) =>
        document.getElementById(index).querySelector('.card__face--back').classList.add('background-image' + item)
        );
    },

    flipCard(cardNumber) {
        if ( !document.getElementById(cardNumber).classList.contains('disabled') )
        {
            if (this.cardsOpened == 0)
            {
                document.getElementById(cardNumber).classList.add('is-flipped');
                document.getElementById(cardNumber).classList.add('disabled');
                this.cardsOpened = 1;
                this.valueCard1 = this.arr[cardNumber];
                this.idCard1 = cardNumber;
            } else if (this.cardsOpened == 1)
            {
                document.getElementById(cardNumber).classList.add('is-flipped');
                document.getElementById(cardNumber).classList.add('disabled');
                this.valueCard2 = this.arr[cardNumber];
                this.idCard2 = cardNumber;
                this.cardsOpened = 2;
        
                if (this.valueCard1 != this.valueCard2)
                {
                    setTimeout(this.flipBack, 1500);
                } else
                {
                    document.getElementById(this.idCard1).classList.add('disabled');
                    document.getElementById(this.idCard2).classList.add('disabled');
                    document.getElementById(this.idCard1).classList.add("guessed");
                    document.getElementById(this.idCard2).classList.add("guessed");
                    this.cardsOpened = 0;
                    this.progress++;
                };

            } else if (this.cardsOpened == 2)
            {
                alert('За раз можно открыть только 2 картинки!');
                this.disableButtons();
            };
        };
        if (this.progress == 5)
        {
            clearTimeout(this.defeatTimerId);
            setTimeout(this.win, 1500);
        };
    },

    flipBack() {
        document.getElementById(cardGame.idCard1).classList.remove('is-flipped');
        document.getElementById(cardGame.idCard2).classList.remove('is-flipped');

        cardGame.cardsOpened = 0;
        cardGame.enableButtons();
    },

    enableButtons()
    {
        for(let i = 0; i < 10; i++)
        {
            if (!document.getElementById(i).classList.contains("guessed"))
            {
                document.getElementById(i).classList.remove('disabled');
            };
        };
    },

    disableButtons()
    {
        for(let i = 0; i < 10; i++)
        {
            document.getElementById(i).classList.add('disabled');
        };
    },

    defeat()
    {
        document.querySelector('.game').hidden = true;
        document.querySelector('.defeat').hidden = false;
    },

    countDown()
    {
        let secondsLeft = document.querySelector('.seconds');
        let plusThirtySeconds = new Date();
        plusThirtySeconds.setSeconds(plusThirtySeconds.getSeconds() + 30);
        let timeLeft = 30;

            let timerId = setTimeout(function tick()
            {
                let date = new Date();
                timeLeft = Math.floor( (plusThirtySeconds - date) / 1000 );
                secondsLeft.innerHTML = timeLeft;

                if (timeLeft > 0)
                {
                    timerId = setTimeout(tick, 1000);
                };
            });
    },

    startGame()
    {
        document.querySelector('.intro').hidden = true;
        document.querySelector('.game').hidden = false;
        this.shuffle(this.arr);
        this.setBackgroundImages();
        this.defeatTimerId = setTimeout(this.defeat, 30000);
        this.countDown();
    },

    win()
    {
        document.querySelector('.game').hidden = true;
        document.querySelector('.win').hidden = false;
    },

};