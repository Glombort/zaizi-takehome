const door1 = document.querySelector("#door-1 > button");
const door2 = document.querySelector("#door-2 > button");
const door3 = document.querySelector("#door-3 > button");

const stickOrTwist = document.querySelector("#stickOrTwist");

const losingDoor = document.querySelector("#losingDoor");
const stickBtn = stickOrTwist.querySelector("#stick");
const twistBtn = stickOrTwist.querySelector("#twist");

const finalOutput = document.querySelector("#winOrLose");
const instance = finalOutput.querySelector("#instance");
const multipleInstances = finalOutput.querySelector("#multipleInstances");

// Setup for whats behind the doors, with 1 being a win
let behindDoors = [0, 0, 1];
let selectedDoor;
let twistDoor;

door1.addEventListener("click", () => firstDoorSelect(1));
door2.addEventListener("click", () => firstDoorSelect(2));
door3.addEventListener("click", () => firstDoorSelect(3));

stickBtn.addEventListener("click", () => stick(selectedDoor))
twistBtn.addEventListener("click", () => twist(twistDoor))

function firstDoorSelect(doorNumber) {
    selectedDoor = doorNumber;
    
    stickOrTwist.classList.remove("hide");
    door1.classList.add("hide");
    door2.classList.add("hide");
    door3.classList.add("hide");


    // Shuffle door order to start with
    behindDoors = behindDoors.sort(() => Math.random() - 0.5);

    const goatDoor = behindDoors.findIndex((el, index) => {
        return (el === 0 && index !== doorNumber - 1)
    }) + 1;

    twistDoor = 6 - goatDoor - selectedDoor

    losingDoor.textContent = `There is a goat behind door ${goatDoor}! You can stick with door ${selectedDoor} or switch to door ${twistDoor}`
}

function stick(doorNumber) {
    winOrLose(doorNumber)
    const wins = largeOutcomes(doorNumber);
    const losses = 1000 - wins;
    multipleInstances.textContent = `But if over 1000 times of sticking you would win ${wins} and lose ${losses}`
}

function twist(doorNumber) {
    winOrLose(doorNumber)
    const losses = largeOutcomes(doorNumber);
    const wins = 1000 - losses;
    multipleInstances.textContent = `But if over 1000 times of twisting you would win ${wins} and lose ${losses}`
}

function winOrLose(doorNumber) {
    if ( behindDoors[doorNumber - 1] === 1) {
        instance.textContent = `Congrats you won this time`
    } else {
        instance.textContent = `Unlucky you lost this time`
    }
}

function largeOutcomes(doorNumber) {
    let winBehindChoosen = 0;
    for (let i=1; i < 1000; i++) {
        let winningDoor = Math.floor((Math.random() * 3)) + 1;
        if ( winningDoor === doorNumber ) {
            winBehindChoosen ++;
        }
    }
    return winBehindChoosen;
}