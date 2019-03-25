const app = module.exports = require('express')();
const {getNotes, saveNote, removeNote} = require(`../actions`).notes;

app.get(`/`, (req, res) => {
    getNotes(req, res);
});

app.post(`/`, (req, res) => {
    saveNote(req, res);
});

app.delete(`/`, (req, res) => {
    removeNote(req, res);
});
