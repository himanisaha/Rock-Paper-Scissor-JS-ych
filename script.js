        let score = JSON.parse(localStorage.getItem("score"));
        if (score === null) {
            score = {
                wins: 0,
                losses: 0,
                ties: 0
            }
        }


        function playGame(playerMove) {
            const computerMove = pickComputerMove();
            let result = " ";

            //scissor part
            if (playerMove === "Scissor") {
                result = computerMove === "Rock" ? "Lose" : computerMove === "Paper" ? "Win" : "Tie";
            } else if (playerMove === "Paper") {
                result = computerMove === "Rock" ? "Win" : computerMove === "Paper" ? "Tie" : "Lose";
            } else if (playerMove === "Rock") {
                result = computerMove === "Rock" ? "Tie" : computerMove === "Paper" ? "Lose" : "Win";
            }

            //update score
            if (result === 'Win') {
                score.wins += 1;//score.wins = score.wins +1
            } else if (result === 'Lose') {
                score.losses += 1;
            } else if (result === 'Tie') {
                score.ties += 1;
            }
            localStorage.setItem('score', JSON.stringify(score));
            updateScoreElement();

            // document.querySelector('.js-result')
            //     .innerHTML = `Final result is you ${result}`;
            const resultElement = document.querySelector('.js-result');
            resultElement.innerHTML = `Final result is you ${result}.`;
            resultElement.classList.add('show');
            setTimeout(() => {
                resultElement.classList.remove('show');
            }, 2000);
            document.querySelector('.js-action').innerHTML = `
            You Picked <img src="images/${playerMove}.png" alt="${playerMove}" width="35" height="35" style="position: relative; top: 8px;"> VS
            Computer Picked <img src="images/${computerMove}.png" alt="${computerMove}" width="35" height="35" style="position: relative; top: 6px;">. So You ${result}`;
        }


        // alert(` Computer Picked ${computerMove}.So You ${result}`);

        //reset the score and display also



        function resetScore() {
            score = {
                wins: 0,
                losses: 0,
                ties: 0,
            };
            let resetButton = document.querySelector(".reset-score-btn");
            if (resetButton.innerText === "Reset Game") {
                resetButton.innerText = "Restart Game";
                resetButton.classList.add('btn-clicked');
            } else {
                resetButton.innerText = "Reset Game";
                resetButton.classList.remove('btn-clicked');
            }
            resetButton.classList.add("shake");
            setTimeout(() => {
                resetButton.classList.remove("shake");
            }, 500);
            localStorage.setItem("score", JSON.stringify(score));
            score = JSON.parse(localStorage.getItem("score"));
            document.querySelector('.js-action').innerHTML = ' ';
            document.querySelector('.js-result').innerHTML = ' ';
            console.log("Score after reset:", score);
            // Update result text
            // document.querySelector('.js-result').innerHTML = `Final result: You ${result}`;

            //     alert(`Your game is successfully now reset.
            // Wins : ${score.wins}, Loss :${score.losses}, Tie :${score.ties}`);

        }
        function updateScoreElement() {
            document.querySelector('.js-score')
                .innerHTML = ` Wins : ${score.wins}, Loss :${score.losses}, Tie :${score.ties}`;
            // scoreElement.classList.add('updated');
            // setTimeout(() => {
            //     scoreElement.classList.remove('updated');
            // }, 500);
        }



        function pickComputerMove() {
            const randomNumber = Math.random();

            let computerMove = ' ';  //Empty String
            if (randomNumber >= 0 && randomNumber < 1 / 3) {
                computerMove = 'Rock';
            } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                computerMove = 'Paper';
            }
            else if (randomNumber >= 2 / 3 && randomNumber < 1) {
                computerMove = 'Scissor';
            }
            return computerMove;
        }