import React, { Component } from 'react';
import ListItem from './ListItem';
import NewItem from './NewItem';
import URLS from '../constants/urls';

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
        console.log(this.state);

        const listNotes = this.state.notes.map((note, index) =>
            <ListItem
                key={note.id}
                data={note}
                getNotes={this.getNotes}
            />
        );

        return (
            <div className="mt-5">
                <NewItem
                    getNotes={this.getNotes}
                />
                {listNotes}
            </div>
        );
    }
}

export default List;
