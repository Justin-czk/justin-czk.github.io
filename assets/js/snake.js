// document not in use

document.addEventListener("DOMContentLoaded", () => {
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
        x: getRandomInt(1, 24) * grid,
        y: getRandomInt(1, 24) * grid
    };

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

        apple.x = getRandomInt(1, 24) * grid;  // Ensure apple does not appear at the edges
        apple.y = getRandomInt(1, 24) * grid;  // Ensure apple does not appear at the edges

        score = 0;
        scoreElement.innerText = score;
    }

    function gameLoop() {
        requestAnimationFrame(gameLoop);

        if (++count < 4) {
            return;
        }
        count = 0;

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
                apple.x = getRandomInt(1, 24) * grid;  // Ensure apple does not appear at the edges
                apple.y = getRandomInt(1, 24) * grid;  // Ensure apple does not appear at the edges
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

    resetGame();
    requestAnimationFrame(gameLoop);
});
