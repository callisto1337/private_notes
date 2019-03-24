const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'production'
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * Возвращает список созданных заметок
 */
app.get(`/api/notes/`, (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM notes`, (error, result) => {
            connection.release();

            if (error) {
                res.send({
                    error,
                    success: false
                });

                return;
            }

            res.send({
                data: result,
                success: true
            });
        });
    });
});

/**
 * Создает новую заметку
 */
app.post(`/api/notes/`, (req, res) => {
    pool.getConnection((err, connection) => {
        const text = req.body.text;
        const date = req.body.date;
        const errors = {};

        if (!text) {
            errors.text = `Укажите текст заметки`;
        }

        if (!date) {
            errors.date = `Укажите дату заметки`;
        }

        if (Object.keys(errors).length) {
            res.send({
                errors,
                success: false
            });

            return;
        }

        connection.query(
            `INSERT INTO notes (text, date) VALUES ('${text}', '${date}')`,
            (error) => {
            connection.release();

            if (error) {
                res.send({
                    error,
                    success: false
                });

                return;
            }

            res.send({success: true});
        });
    });
});

/**
 * Удаляет созданную заметку
 */
app.delete(`/api/notes/`, (req, res) => {
    pool.getConnection((err, connection) => {
        const id = req.body.id;

        if (!id) {
            res.send({
                error: `Укажите ID заметки`,
                success: false
            });

            return;
        }

        connection.query(
            `DELETE FROM notes WHERE id='${id}'`,
            error => {
                connection.release();

                if (error) {
                    res.send({
                        error,
                        success: false
                    });

                    return;
                }

                res.send({success: true});
            });
    });
});

app.listen(port, () => console.log(`Сервер запущен на порту ${port}!`));
