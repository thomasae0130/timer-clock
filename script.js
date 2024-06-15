// Select the span elements
const hoursTens = document.querySelector('.hoursTens');
const hoursOnes = document.querySelector('.hoursOnes');
const minutesTens = document.querySelector('.minutesTens');
const minutesOnes = document.querySelector('.minutesOnes');
const secondsTens = document.querySelector('.secondsTens');
const secondsOnes = document.querySelector('.secondsOnes');

// Select the plus and minus buttons
const addButton = document.querySelector('.plus');
const subtractButton = document.querySelector('.minus');

let pausePlayButton = document.querySelector('.pausePlay');
let pauseIcon = document.querySelector('.pauseIcon');

// Create the play icon element
let playIcon = document.createElement('i');
playIcon.classList.add('fa-solid', 'fa-play', 'playIcon');

// Add the ::before content for playIcon dynamically
let style = document.createElement('style');  // Create a new <style> element
style.type = 'text/css';  // Set the type attribute to 'text/css'
style.innerHTML = `
.playIcon::before {
    content: "\\f04b"; /* Font Awesome Unicode for play icon */
    font-family: "Font Awesome 5 Free";
    font-weight: 900; /* Solid style */
    display: inline-block;
    height: 2.7%;
    width: 4.8%;
    margin-right: 80%;
    
}
`;  // Set the inner HTML of the <style> element to the CSS rules
document.getElementsByTagName('head')[0].appendChild(style);  // Append the <style> element to the <head> section

let paused = true;

pausePlayButton.onclick = function() {
    const spans = [hoursTens, hoursOnes, minutesTens, minutesOnes, secondsTens, secondsOnes];
    if (paused) {
        spans.forEach((span) => {
            span.style.color = 'rgb(0, 0, 0)';
        })
        pauseIcon.replaceWith(playIcon);
        paused = false;
        countDown();
    } else {
        playIcon.replaceWith(pauseIcon);
        paused = true;
        clearInterval(interval);
    }
};
// Function to increment the number in the span element
const incrementNumber = () => {
    const spans = [hoursTens, hoursOnes, minutesTens, minutesOnes, secondsTens, secondsOnes];

    spans.forEach((span) => {
        if (span.style.color === 'rgb(237, 93, 24)') { // Checking for rgb value for #ED5D18
            let currentValue = parseInt(span.innerText, 10);
            if (currentValue < 9) {
                currentValue += 1; // Increment by 1 if currentValue is less than 9
            }
            span.innerText = currentValue;
        }
    });
};

// Function to decrement the number in the span element
const decrementNumber = () => {
    const spans = [hoursTens, hoursOnes, minutesTens, minutesOnes, secondsTens, secondsOnes];

    spans.forEach((span) => {
        if (span.style.color === 'rgb(237, 93, 24)') { // Checking for rgb value for #ED5D18
            let currentValue = parseInt(span.innerText, 10);
            if (currentValue > 0) {
                currentValue -= 1; // Decrement by 1 if currentValue is greater than 0
            }
            span.innerText = currentValue;
        }
    });
};

// Add the click event listener to the plus and minus buttons
addButton.addEventListener('click', incrementNumber);
subtractButton.addEventListener('click', decrementNumber);

// Add click event listener to each span element to change text color
document.querySelectorAll('span').forEach(span => {
    span.addEventListener('click', (event) => {
        if (paused === true && event.target.style.color === 'rgb(0, 0, 0)') {
            event.target.style.color = '#ED5D18';
        } else {
            event.target.style.color = 'rgb(0, 0, 0)';
        }
    });
});


// initalize the reset button in a variable
const resetButton = document.querySelector('.reset');

// Add the click event listener to the reset button
resetButton.addEventListener('click', () => { 
    const spans = [hoursTens, hoursOnes, minutesTens, minutesOnes, secondsTens, secondsOnes];
    spans.forEach((span) => { 
        span.innerHTML = 0;
        span.style.color = 'rgb(0, 0, 0)';
    });
});

//CONBERT TIMES TIMES INTO SECONDS and put the total seconds in a variable
const timePlaces = [hoursTens, hoursOnes, minutesTens, minutesOnes, secondsTens, secondsOnes];

const convertTimePlaces = (timePlaces) => {
    // Map the innerHTML values to integers
    let timePlacesInt = timePlaces.map((place) => parseInt(place.innerHTML, 10));

    // Calculate the total time in seconds
    let totalSeconds = 
        (timePlacesInt[0] * 10 * 60 * 60) +  // hours tens
        (timePlacesInt[1] * 60 * 60) +       // hours ones
        (timePlacesInt[2] * 10 * 60) +       // minutes tens
        (timePlacesInt[3] * 60) +            // minutes ones
        (timePlacesInt[4] * 10) +            // seconds tens
        timePlacesInt[5];                    // seconds ones

    return totalSeconds;
};

let interval;


// seconds countdown
const countDown = () => {
     let totalSeconds= convertTimePlaces(timePlaces);
     
      interval = setInterval(() => {
        if((paused === false) && (totalSeconds > 0)) {
            totalSeconds -= 1;
            console.log(totalSeconds);
            updateTimer(totalSeconds);
        } else {
            clearInterval(interval);
        }
     }, 1000);
};

const updateTimer = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    // Update hours tens and ones
    hoursTens.innerHTML = Math.floor(hours / 10);
    hoursOnes.innerHTML = hours % 10;

    // Update minutes tens and ones
    minutesTens.innerHTML = Math.floor(minutes / 10);
    minutesOnes.innerHTML = minutes % 10;

    // Update seconds tens and ones
    secondsTens.innerHTML = Math.floor(seconds / 10);
    secondsOnes.innerHTML = seconds % 10;
};


