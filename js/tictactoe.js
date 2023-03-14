//this variable keeps track of whose turn it is
let activePlayer = 'X';
//this array stores an array of moves using to determine win conditions
let selectedSquares = [];

//this is function for placing X or O
function placeXOrO (squareNumber) {
    //this condition ensures a square hasnt already been selected
    //the .some method is used to check each elementof selectedSquare array to 
    //see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this variable retrieves the html element id that was clicked
        let select = document.getElementById(squareNumber);
        //this conditon checks who's turn it is
        if (activePlayer ==='X') {
            //if activePlayer is equal to X the the x.png is placed in the HTML
            select.style.backgroundImage = 'url("images/x.png")';
        //active player may only be 'X' or 'O' if not x it must be o
        } else {
            //if activePlayer is equal to 'O' the o.png is placed in html
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push (squareNumber + activePlayer);
        //this calls a function to check for any win conditons
        checkWinConditons();
        //this is conditon for changing the active player
        if (activePlayer ==='X') {
            //if active player is X change to O
            activePlayer = 'O';
        //if active player is anything other than X 
        } else {
            //change active player
            activePlayer = 'X';
        }

        //this function plays a placement sound
        audio('./media/place.mp3');
        //this condition checks to see if it is computers turn
        if(activePlayer ==='O') {
            //this disables clicking for computers choice
            disableClick();
            //this function waits 1 second before placing the image and enabling the click
            setTimeout(function () { computersTurn();},1000);
        }
        //returnign true is needed for computersTurn () function to work
        return true;
             
    }
    //this function results in a random square being selected
    function computersTurn() {
        // this boolean is needed for while loop
        let success = false;
        //this variable stores a random number 0-8
        let pickASquare;
        //this condition allows our while loop to keep trying if a square is already selected
        while (!success) {
            //A random number between 0-8 is selected
            pickASquare = String(Math.floor(Math.random() *9));
            //if the random number evalutes return true, the square hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                //this calls the function
                placeXOrO (pickASquare);
                //this changes our boolean and ends the loop
                success = true
            };
        }

    }

}

//this function parses the selected squares array to search for win conditions
//drawWinLine function is called to draw line if condition is met
function checkWinConditons() {
    if      (arrayIncludes('0X', '1X', '2X')) {drawWinLine (50,100,558,100);}
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine (50,304,558,304);}
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine (50,508,558,508);}
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine (100,50,100,558);}
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine (304,50,304,558);}
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine (508,50,508,558);}
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine (100,508,510,90);}
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine (100,100,520,520);}
    else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine (50,100,558,100);}
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine (50,304,558,304);}
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine (50,508,558,508);}
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine (100,50,100,558);}
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine (304,50,304,558);}
    else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine (508,50,508,558);}
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine (100,508,510,90);}
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine (100,100,520,520);}
    //this is to check for a tie if none of the above conditions register
    //and 9 squares are selected the code executes
    else if (selectedSquares.length >=9) {
        //this plays the tie sound
        audio ('./media/tie.mp3');
        //this sets a reset timer of 3 seconds
        setTimeout(function () {resetGame();},3000);
    }
    //this is to check if an array includes 3 strings for checking win condition
    function arrayIncludes (squareA, squareB, squareC) {
        //the next 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included in the array
        //true is returned and our else if conditon is executed with the drawWinLine function
        if (a===true && b===true && c===true) {return true;}
    }
}

//this function makes our body element temporarily unclickable
function disableClick() {
    body.style.pointerEvents = 'none';
    //this makes it clickable again after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//this function takes a string parameter of path you set earlier for sound placement
function audio(audioURL) {
    //create a new audio object and pass the path as a parameter
    let audio = new Audio (audioURL);
    audio.play();
}

//this fuction utilises html canvas to draw win lines
function drawWinLine (coordX1, coordY1, coordX2, coordY2) {
    //this line accesses html canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    //this will indicate where start 1 is and where it ends 2
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        //this variable stores temp x and y axis data in animation loop
        x= x1,
        y=y1;

        //this function interacts with the canvas
        function animateLineDrawing() {
            //this variable creates the loop for when game ends it restarts
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            //this method clears content from last loop iteration
            c.clearRect (0,0,608,608);
            //this starts new path
            c.beginPath();
            //this moves us to a starting point for our line
            c.moveTo (x1,y1);
            //this indicates the end point of line
            c.lineTo (x,y);
            //sets width of line
            c.LineWidth = 10;
            //this method sets the colour of line
            c.strokeStyle = 'rgba(70,255,33,.8)';
            //this method draws everything we laid out
            c.stroke();
            //this checks if we reached endpoint
            if (x1 <= x2 && y1 <= y2) {
                //this conditions adds 10 to the previous x and y point
                if (x<x2) {x+=10;}
                if (y<y2) {y+=10;}
                //this cancels animation loop
                if (x>=x2 && y>=y2) {cancelAnimationFrame(animationLoop);}
            }
            //this condition is similar to one above
            //it was necessary for 6, 4, 2 win condition
            if (x1 <=x2 && y1>=y2) {
                if (x<x2) {x+=10;}
                if (y>y2) {y-=10;}
                if (x>=x2 && y <=y2) {cancelAnimationFrame(animationLoop);}
            }

        }

        //this function clears canvas after our win line is drawn
        function clear() {
            //this line starts our animation loop
            const animationLoop = requestAnimationFrame(clear);
            //this line clears our canvas
            c.clearRect (0,0,608,608);
            //this line stops our animation loop
            cancelAnimationFrame(animationLoop);
        }
        //this line disables disallows clicking while the win sound is playing
        disableClick();
        //this line plays the win sounds
        audio('./media/winGame.mp3');
        //this line calls the main animation loop
        animateLineDrawing();
        //this line waits 1 second
        //then clears canvas, resets game, and allows clicking again
        setTimeout(function() {clear(); resetGame(); },1000);
}

//this is the reset function
function resetGame() {
    //this for loop iterates through each html square element
    for (let i = 0; i<9; i++){
        //this vaiable gets the html element of i
        let square = document.getElementById(String(i));
        //this removes elements background image
        square.style.backgroundImage ='';
    }
    //this resets our array so it is empty and we can start over
    selectedSquares =[];
}