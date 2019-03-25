const mysql = require('mysql');
const config = require(`../configs/db`);
const pool = mysql.createPool(config);

/**
 * Возвращает список созданных заметок
 */
const getNotes = (req, res) => {
    pool.getConnection((error, connection) => {
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
};

const saveNote = (req, res) => {
    pool.getConnection((error, connection) => {
        const text = req.body.text;
        const date = req.body.date;
        const errors = [];

        if (!text) {
            errors.push({
                field: `text`,
                text: `Укажите текст заметки!`
            });
        }

        if (!date) {
            errors.push({
                field: `date`,
                text: `Укажите дату заметки!`
            });
        }

        if (errors.length) {
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
};

const removeNote = (req, res) => {
    pool.getConnection((error, connection) => {
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
};

module.exports = {
    getNotes,
    saveNote,
    removeNote
};
