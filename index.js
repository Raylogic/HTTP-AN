const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Part #1 (60%) - URL 
// Addition
app.get('/add/:x/:y/', (req, res) => {
    // Get numbers
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);

    // Do the operation
    res.setHeader('Content-Type', 'text/plain');
    const result = x + y;
    

    // Is the result a number?
    if (isNaN(result)) {
        res.status(500).send('Invalid type of parameters');
    } else {
        res.send(`HTTP/1.1 200 OK\nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/add/*', (req, res) => {
    res.status(500).send('Invalid number of parameters');
})


// Substraction
app.get('/substract/:x/:y/', (req, res) => {
    // Get numbers
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);

    // Do the operation
    res.setHeader('Content-Type', 'text/plain');
    const result = x - y;
    

    // Is the result a number?
    if (isNaN(result)) {
        res.status(500).send('Invalid type of parameters');
    } else {
        res.send(`HTTP/1.1 200 OK\nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/substract/*', (req, res) => {
    res.status(500).send('Invalid number of parameters');
})


// Multiplication
app.get('/multiply/:x/:y/', (req, res) => {
    // Get numbers
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);

    // Do the operation
    res.setHeader('Content-Type', 'text/plain');
    const result = x * y;
    

    // Is the result a number?
    if (isNaN(result)) {
        res.status(500).send('Invalid type of parameters');
    } else {
        res.send(`HTTP/1.1 200 OK\nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/multiply/*', (req, res) => {
    res.status(500).send('Invalid number of parameters');
})


// Division
app.get('/divide/:x/:y/', (req, res) => {
    // Get numbers
    const x = parseFloat(req.params.x);
    const y = parseFloat(req.params.y);

    // Divide by zero?
    if (y == 0) {
        res.status(500).send('Cannot divide by zero');
        return;
    }

    // Do the operation
    res.setHeader('Content-Type', 'text/plain');
    const result = x / y;
    
    
    // Is the result a number?
    if (isNaN(result)) {
        res.status(500).send('Invalid type of parameters');
    } else {
        res.send(`HTTP/1.1 200 OK\nContent-Type: text/plain\n\n${result}`);
    }
})
app.get('/divide/*', (req, res) => {
    res.status(500).send('Invalid number of parameters');
})


// Part #2 (30%) - JSON
// Operation to perform
function calc(op,x,y) {
    switch(op) {
        case 'add': return x + y; 
        case 'substract': return x - y; 
        case 'multiply': return x * y; 
        case 'divide': return x / y; 
        default: return NaN;
    } 
}

// JSON Function
app.post('/', (req, res) => {
    // Is JSON formed correctly?
    if (!req.body.operation || !req.body.arguments) {
        res.status(500).send('Malformed JSON request');
        return;
    }
    
    // Get operation to perform
    const op = req.body.operation;

    // How many numbers we received?
    if (req.body.arguments.length != 2) {
        res.status(500).send('Invalid number of parameters');
        return;
    }
    
    // Get numbers
    const x = req.body.arguments[0];
    const y = req.body.arguments[1];

    // Are numbers valid?
    if (isNaN(x) || isNaN(y)) {
        res.status(500).send('Invalid type of parameters');
        return;
    }

    // Divide by zero?
    if (req.body.operation == 'divide') {
        if(y == 0) {
            res.status(500).send('Cannot divide by zero');
            return;
        }
    }

    // Do the operation?
    const result = calc(op,x,y);
    res.setHeader('Content-Type', 'application/json');

    // Is the result a number?
    if (isNaN(result)) {
        res.status(500).send('Invalid type of parameters');
    } else {
        res.send(`HTTP/1.1 200 OK\n Content-Type: application/json\n\n{\n "result": ${result} \n}`);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})