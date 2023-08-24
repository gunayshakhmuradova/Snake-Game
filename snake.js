const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let initialState = {
    cols: 30,
    rows: 20,
    food: {
        x: null,
        y: null
    },
    snake: {
        x: 0,
        y: 0
    },
    score: 0,
    tail: [],
    static: 20,
    vel: {
        x: 0,
        y: 0
    },
    gameOver: false
}

canvas.width = initialState.static * initialState.cols; // 600
canvas.height = initialState.static * initialState.rows; // 400

class Square {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Text {
    constructor(text, x, y, textAlign, fontSize) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    draw() {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = 'red';
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x, this.y);
    }
}

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            initialState.vel.x = 0;
            initialState.vel.y = -1;
            break;
        case 'ArrowDown':
            initialState.vel.x = 0;
            initialState.vel.y = 1;
            break;
        case 'ArrowLeft':
            initialState.vel.x = -1;
            initialState.vel.y = 0;
            break;
        case 'ArrowRight':
            initialState.vel.x = 1;
            initialState.vel.y = 0;
            break;
        default:
            break;
    }
});

const generateFood = () => {
    initialState.food.x = Math.floor(Math.random() * initialState.cols) * initialState.static;
    initialState.food.y = Math.floor(Math.random() * initialState.rows) * initialState.static;
}

const loop = () => {
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        new Square(0, 0, canvas.width, canvas.height, 'black').draw();
        new Square(
            initialState.snake.x,
            initialState.snake.y,
            initialState.static,
            initialState.static,
            'blue'
        ).draw();
        new Square(
            initialState.food.x,
            initialState.food.y,
            initialState.static,
            initialState.static,
            'green'
        ).draw();

        initialState.snake.x += initialState.vel.x * initialState.static;
        initialState.snake.y += initialState.vel.y * initialState.static;

        if (initialState.snake.x === initialState.food.x && initialState.snake.y === initialState.food.y) {
            initialState.tail.push([initialState.food.x, initialState.food.y]);
            initialState.score++;
            generateFood();
            document.getElementById('score').innerText = ` ${initialState.score}`;
        }

        for (let i = initialState.tail.length - 1; i >= 1; i--) {
            initialState.tail[i] = initialState.tail[i - 1];
        }
        if (initialState.tail.length) {
            initialState.tail[0] = [initialState.snake.x, initialState.snake.y];
        }

        for (let i = 0; i < initialState.tail.length; i++) {
            new Square(
                initialState.tail[i][0],
                initialState.tail[i][1],
                initialState.static,
                initialState.static,
                'blue'
            ).draw();
        }

        if (
            initialState.snake.x < 0 ||
            initialState.snake.x >= initialState.cols * initialState.static ||
            initialState.snake.y < 0 ||
            initialState.snake.y >= initialState.rows * initialState.static
        ) {
            gameOver();
        }

        if (initialState.gameOver) {
            new Text('Game Over', canvas.width / 2, canvas.height / 2 - 25, 'center', 50).draw();
            new Text('Click to restart', canvas.width / 2, canvas.height / 2 + 25, 'center', 20).draw();
        }
    }, 1000 / 10);
};

const gameOver = () => {
    initialState.gameOver = true;
    initialState.tail = [];
    initialState.score = 0;
    initialState.static = 0;
    initialState.vel = {
        x: 0,
        y: 0
    }
    initialState.food = {
        x: null,
        y: null
    }
    initialState.snake = {
        x: 0,
        y: 0
    }
}

addEventListener('click', () => {
    initialState.gameOver = false;
    initialState.tail = [];
    initialState.score = 0;
    initialState.static = 20;
    initialState.vel = {
        x: 0,
        y: 0
    }
    generateFood(); 
    initialState.snake = {
        x: 0,
        y: 0
    }
})

generateFood();
loop();
