
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Part #1 (60%) 

app.get('/add/:x/:y/',  (req, res) => {
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);

    res.header('Content-Type', 'text/plain')
    const result = x + y;

    if (isNaN(result)) {
        res.sendStatus(500);
    } else {
        res.send(`HTTP/1.1 200 OK \nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/add/*', (req, res) => {
    res.status(500);
    res.send(`Invalid number of parameters`);
})

app.get('/substract/:x/:y/',  (req, res) => {
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);
    const result = x - y;

    res.header('Content-Type', 'text/plain')

    if (isNaN(result)) {
        res.sendStatus(500);
    } else {
        res.send(`HTTP/1.1 200 OK \nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/substract/*', (req, res) => {
    res.status(500);
    res.send(`Invalid number of parameters`);
})

app.get('/multiply/:x/:y/',  (req, res) => {
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);
    const result = x * y;

    res.header('Content-Type', 'text/plain')

    if (isNaN(result)) {
        res.sendStatus(500);
    } else {
        res.send(`HTTP/1.1 200 OK \nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/multiply/*', (req, res) => {
    res.status(500);
    res.send(`Invalid number of parameters`);
})

app.get('/divide/:x/:y/',  (req, res) => {
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);
    if (y == 0) {
        res.sendStatus(500);
        return;
    }

    res.header('Content-Type', 'text/plain')

    const result = x / y;
    
    if (isNaN(result)) {
        res.sendStatus(500);
    } else {
        res.send(`HTTP/1.1 200 OK \nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/divide/*', (req, res) => {
    res.status(500);
    res.send(`Invalid number of parameters`);
})

// Part #2 (30%) 

function calc(op,x,y) {
    switch(op) {
        case 'add': return x + y; 
        case 'substract': return x - y; 
        case 'multiply': return x * y; 
        case 'divide': return x / y; 
        default: return NaN;
    } 
}

app.post('/', (req, res) => {

    if (!req.body.operation || !req.body.arguments) {
        res.status(500);
        res.send(`Malformed JSON request`);
        return;
    }

    const op = req.body.operation;

    if (req.body.arguments.length != 2) {
        res.status(500);
        res.send(`Invalid number of parameters`);
        return;
    }
    
    const x = req.body.arguments[0];
    const y = req.body.arguments[1];

    if (isNaN(x) || isNaN(y)) {
        res.status(500);
        res.send(`Parameters must be numbers`);
        return;
    }

    if (req.body.operation == 'divide') {
        if(y == 0) {
            res.status(500);
            res.send(`Cannot divide by zero`);
            return;
        }
    }

    const result = calc(op,x,y);

    if (isNaN(result)) {
        res.sendStatus(500);
    } else {
        res.send(`HTTP/1.1 200 OK\n Content-Type: application/json\n\n{\n "result": ${result} \n}`);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})