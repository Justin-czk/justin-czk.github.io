---
layout: page
title: Snake Game
---

This is a commonly done project, the snake game! It teaches me how to use javascript to create a game canvas in a webpage, using event listeners and other fun stuff to make this game. Try it out below!


## Snake Game

<!-- Add a CSS border to the canvas for a white outline -->
<canvas id="gameCanvas" width="400" height="400" style="border: 2px solid white;"></canvas>
<p>Score: <span id="score">0</span></p>

<!-- Difficulty level options -->
<p>Select Difficulty:</p>
<label><input type="radio" name="difficulty" value="easy" checked> Easy</label>
<label><input type="radio" name="difficulty" value="medium"> Medium</label>
<label><input type="radio" name="difficulty" value="hard"> Hard</label>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");

    const grid = 20;
    let count = 0;
    let score = 0;
    let snake = {
        x: grid * 5,
        y: grid * 5,
        cells: [],
        maxCells: 4,
        dx: grid,
        dy: 0
    };
    let apple = {
        x: getRandomInt(1, (canvas.width / grid) - 1) * grid,
        y: getRandomInt(1, (canvas.height / grid) - 1) * grid
    };

    // Speeds for different difficulty levels (frames to wait before each update)
    const speeds = {
        easy: 10,
        medium: 7,
        hard: 4
    };

    // Initial speed
    let currentSpeed = speeds.easy;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function resetGame() {
        snake.x = grid * 5;
        snake.y = grid * 5;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(1, (canvas.width / grid) - 1) * grid;
        apple.y = getRandomInt(1, (canvas.height / grid) - 1) * grid;

        score = 0;
        scoreElement.innerText = score;
    }

    function gameLoop() {
        requestAnimationFrame(gameLoop);

        if (++count < currentSpeed) {
            return;
        }
        count = 0;

        // Clear the canvas before drawing new frames
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.x += snake.dx;
        snake.y += snake.dy;

        if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
            resetGame();
        }

        snake.cells.unshift({ x: snake.x, y: snake.y });

        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }

        ctx.fillStyle = "red";
        ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

        ctx.fillStyle = "green";
        snake.cells.forEach(function(cell, index) {
            ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

            if (cell.x === apple.x && cell.y === apple.y) {
                snake.maxCells++;
                apple.x = getRandomInt(1, (canvas.width / grid) - 1) * grid;
                apple.y = getRandomInt(1, (canvas.height / grid) - 1) * grid;
                score++;
                scoreElement.innerText = score;
            }

            for (let i = index + 1; i < snake.cells.length; i++) {
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    resetGame();
                }
            }
        });
    }

    document.addEventListener("keydown", function(e) {
        // Prevent default scrolling behavior for arrow keys
        const arrowKeys = [37, 38, 39, 40];
        if (arrowKeys.includes(e.which)) {
            e.preventDefault();
        }

        if (e.which === 37 && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
        } else if (e.which === 38 && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
        } else if (e.which === 39 && snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
        } else if (e.which === 40 && snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
        }
    });

    // Change speed based on difficulty level
    document.querySelectorAll('input[name="difficulty"]').forEach(function(input) {
        input.addEventListener('change', function() {
            currentSpeed = speeds[this.value];
            resetGame();
        });
    });

    resetGame();
    requestAnimationFrame(gameLoop);
});
</script>
