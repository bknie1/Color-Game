/*  The game logic:

The RGB Color Game uses a difficulty magic number to determine the number of
squares to display on the play space.

We also use this number to generate d number of random colors. We assign those
colors to squares and create listeners for each square that match the square's color
against the target color.

	Format Requirement:
	 - Oxford style commas in color arrays are essential.
	 - Returned color values use the Oxford comma.
	 - Random color assignment must also observe the Oxford comma styling.
*/

var message = document.querySelector("#message"); // Correct/Incorrect Feedback
var color_name = document.getElementById("color_name"); // Display target RGB value.
var squares = document.querySelectorAll(".square"); // Array of square button listeners.
var is_winner = false; // End condition, terminates game loop.
var h1 = document.querySelector("h1"); // Title bar. Color updates on win.
var colors; // 3-6 randomly generated colors. Determined by square count.
var target_color; // Randomly selected color from colors.
var difficulty = 6; // 3-6, depending on user selection.

// Pick a random colors.
new_game();
//-EVENT-SETUP------------------------------------------------------------
/*
	Called by new_game().
	Adds listeners for the menu bar.
	For i square on the field, assigns i color from our randomly generated colors.
	Also, adds listener wherein each button knows its own color.
	On click, checks the target color against the square's color.
	If winner, game over! Otherwise, keep playing.
*/
function assign_listeners() {
	reset_btn.addEventListener("click", new_game);
	easy_btn.addEventListener("click", easy_mode);
	hard_btn.addEventListener("click", hard_mode);

	for(var i = 0; i < squares.length; i++) {
		// Assigns initial colors to squares.
		squares[i].style.backgroundColor = colors[i];

		// Assigns mouse click listeners to squares.
		squares[i].addEventListener("click", function() {
			// Retrieve color of clicked square.
			var clicked_color = this.style.backgroundColor;

			// Compare and determine game state.
			if(!is_winner) {
				if(clicked_color === target_color) {
					is_winner = true;
					message.textContent = "Correct!";
					reset_btn.textContent = "Play Again?";
					match_squares(target_color);
					h1.style.backgroundColor = target_color;
				} else {
					message.textContent = "Try Again";
					this.style.backgroundColor = "#232323";
				}
			}
		});
	}
}
//-METHODS----------------------------------------------------------------
function new_game() {
	/*
		On refresh/new game, updates the play field with d (difficulty) # of squares.
		Generates random colors based on that difficulty and picks a target/win color.
		Updates the GUI to display this target color.
		Assigns listeners to our menu buttons and d squares.
	*/
	reset_btn.textContent = "New Game";
	square_visibility(difficulty);
	colors = generate_colors(difficulty);
	target_color = pick_target_color();
	color_name.textContent = target_color;
	assign_listeners();
	is_winner = false;
	h1.style.backgroundColor = "steelblue";
	message.textContent = "Game started.";
}
//------------------------------------------------------------------------
function easy_mode() {
	// Sets smaller difficulty parameter used to create a new game with only 3 squares.
	difficulty = 3;
	new_game();
	easy_btn.classList.add("selected");
	hard_btn.classList.remove("selected");
}
//------------------------------------------------------------------------
function hard_mode() {
	// Sets a larger difficulty parameter used to create a new game with all 6 squares.
	difficulty = 6;
	new_game();
	hard_btn.classList.add("selected");
	easy_btn.classList.remove("selected");
}
//------------------------------------------------------------------------
// Generates a randomized color array to populate the board.
function generate_colors(num) {
	var colors = [];
	for(var i = 0; i < num; i++) {
		colors[i] = random_color();
	}
	return colors;
}
//------------------------------------------------------------------------
// Generates a single random RGB value. Used to populate the colors array.
function random_color() {
	color = []; // Three item, RGB value array.
	for(var i = 0; i < 3; ++i) {
		color[i] = Math.floor(Math.random() * 256);
	}
	return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
}
//------------------------------------------------------------------------
// Picks a random color for the game.
function pick_target_color() {
	return colors[Math.floor(Math.random() * colors.length)];
}
//------------------------------------------------------------------------
// Assigns all squares the winning color value on win condition.
function match_squares(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	document.body.backgroundColor = color;
}
//------------------------------------------------------------------------
// Hides squares based on difficulty.
function square_visibility(difficulty) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.display = 'none';
	}
	for(var i = 0; i < difficulty; i++) {
		squares[i].style.display = '';
	}
}
//------------------------------------------------------------------------
