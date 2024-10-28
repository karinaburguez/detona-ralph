const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livesLeft: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function resetGame() {
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.livesLeft = 3;

    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.lives.textContent = `x${state.values.livesLeft}`;

    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function checkGameOver() {
    if (state.values.livesLeft <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        setTimeout(() => {
            alert("Game Over! O seu resultado foi " + state.values.result);
            resetGame();
        }, 500);
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        checkGameOver();
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randowSquare = state.view.squares[randomNumber];
    randowSquare.classList.add("enemy");
    state.values.hitPosition = randowSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit2");

            } else if (square.id != state.values.hitPosition && state.values.result > 0) {
                state.values.result--;
                state.view.score.textContent = state.values.result;
                state.values.livesLeft--;
                state.view.lives.textContent = `x${state.values.livesLeft}`;
                state.values.hitPosition = null;
                playSound("error");

                if (state.values.livesLeft === 0) {
                    setTimeout(() => {
                        checkGameOver();
                    }, 500);
                }

            } else if (square.id != state.values.hitPosition && state.values.result === 0) {
                state.values.livesLeft--;
                state.view.lives.textContent = `x${state.values.livesLeft}`;
                

                if (state.values.livesLeft === 0) {
                    setTimeout(() => {
                        checkGameOver();
                    }, 500);
                }
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();