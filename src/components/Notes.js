import React, { Component } from 'react';
import NotesItem from './NotesItem';
import NewNote from './NewNote';
import URLS from '../constants/urls';
import {Alert} from 'react-bootstrap';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: []
        };
        this.getNotes();
    }

    getNotes = () => {
        fetch(URLS.api.notes)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.success) {
                    this.setState({
                        notes: resp.data
                    });
                }
            });
    };

    render() {
        const listNotes = this.state.notes.map(note =>
            <NotesItem
                key={note.id}
                data={note}
                getNotes={this.getNotes}
            />
        );

        return (
            <div className="mt-5">
                <NewNote
                    getNotes={this.getNotes}
                />
                {this.state.notes.length ?
                    listNotes :
                    <Alert
                        variant="primary"
                        className="mt-3"
                    >
                        Заметок пока нет. Пора создать первую!
                    </Alert>
                }
            </div>
        );
    }
}

export default List;
