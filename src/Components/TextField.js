import React, {Component} from "react";
import {InputGroup, FormControl} from "react-bootstrap";
import "./TextField.css";

class TextField extends Component {
    constructor(props) {
        super(props);
        this.onKeyUp = this.onKeyUp.bind(this)
        //this.state = { inputValue: '' }
    }

    onKeyUp(event) {
        if (event.key === "Enter") {
            //this.setState({inputValue: event.target.value})
            this.props.handleEnter({value:event.target.value})
            event.target.value = ''
        }
    }

    render() {

        return (
            <div>
                <InputGroup>
                    <FormControl id="locationTitle" placeholder="location title" onKeyPress={this.onKeyUp}/>
                </InputGroup>
            </div>
        );
    }

}

export default TextField;