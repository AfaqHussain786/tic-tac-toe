let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const choices = document.querySelectorAll(".choice");
const choiceO = document.querySelector(".choice-o");
const choiceX = document.querySelector(".choice-x");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
let turns = document.querySelector(".turns");
let turnO = true;//player x,playerO


choiceO.addEventListener("click", () => {
    console.log("choice was clicked by player one");
    p1.innerText = "O is selected by player 1";
    turnO = false;
});
choiceX.addEventListener("click", () => {
    console.log("choice was clicked by player two");
    p2.innerText = "X is selected by player 2";
    turnO = true;
});
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

    // ✅ reset choices & turn text
    p1.innerText = "Player One Choice";
    p2.innerText = "Player Two Choice";
    turns.innerText = "Turn";
};


const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked ");
        if (turnO) {
            box.innerText = "O";
            turns.innerText = "Now P2 Turn ";
            turnO = false;
        } else {
            box.innerText = "X";
            turns.innerText = "Now P1 Turn";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();

    });

});
const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = ""; 
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner " + pos1Val);
                showWinner(pos1Val);
                pattern.forEach(index => {
                    boxes[index].style.backgroundColor = "lightgreen";
                });

                winnerFound = true;
                break;
            }
        }
    }
    if (!winnerFound) {
        let allFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                allFilled = false;
                break;
            }
        }
        if (allFilled) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
        }
    }
};


//newGameBtn.addEventListener("click",resetGame);//
resetBtn.addEventListener("click", resetGame);

