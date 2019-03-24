import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import URLS from '../constants/urls';

class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            text: ``
        };
    }

    createDateNow = () => {
        return new Date().toLocaleDateString().split(`/`).join(`-`);
    };

    toggleViewModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    changeText = (event) => {
        this.setState({text: event.target.value});
    };

    createNote = () => {
        fetch(URLS.api.notes, {
            method: `POST`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: this.state.text,
                date: this.createDateNow()
            })
        })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.success) {
                    this.props.getNotes();
                    this.toggleViewModal();
                }
            });
    };

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.toggleViewModal}>
                    <Modal.Header>
                        <Modal.Title>
                            Новая заметка
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <textarea
                            onChange={this.changeText}
                            value={this.state.text}
                            className="form-control"
                            rows="5"
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.toggleViewModal}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.createNote}
                        >
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Button onClick={this.toggleViewModal}>
                    Новая заметка
                </Button>
            </div>
        )
    }
}

export default NewItem;
