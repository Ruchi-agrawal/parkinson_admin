import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Input } from 'reactstrap';

export default class FormElements extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="12" md="12">
                        <div className="cstmFrgt">
                            <h1>Password Recovery</h1>
                            <label>
                                To reset your password, type your email address, and we’ll
                                send you a password reset email.
                            </label>
                            <FormGroup>
                                <Input type="email" placeholder="Email" />
                            </FormGroup>
                            <Button color="primary">Send</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
