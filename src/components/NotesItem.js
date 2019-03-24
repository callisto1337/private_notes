import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import URLS from "../constants/urls";

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.data.text,
            date: props.data.date,
            id: props.data.id
        }
    }

    removeItem = () => {
        const conf = window.confirm(`Вы уверены, что хотите удалить заметку?`);

        if (conf) {
            fetch(URLS.api.notes, {
                method: `DELETE`,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: this.state.id
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.success) {
                    this.props.getNotes();
                }
            });
        }
    };

    render() {
        return (
            <div className="mt-4">
                <h2 className="h6">
                    {this.state.date}
                </h2>
                <div className="card mt-2">
                    <div className="card-body">
                        {this.state.id}
                        <p className="card-text">
                            {this.state.text}
                        </p>
                        <Button
                            onClick={this.removeItem}
                        >
                            Удалить
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListItem;
