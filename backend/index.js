require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors()); //allow React to connect

//Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

//Signup route
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (email, password) VALUES (?,?)';
    db.query(sql, [email, hashedPassword], (err) => {
        if (err) return res.status(400).json({
            success: false,
            error: 'Email already exists'
        });
        res.json({
            success: true
        });
    })
})

//Signin route
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(400).json({
            error: "Invalid email"
        });

        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({
            error: "Invalid password"
        });

        //Create token (valid for 1 hour)
        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
