import React, {Component} from "react";

import "./LocationItem.css";

class LocationItem extends Component {

    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this)
    }

    remove() {
        this.props.onRemovePosition(this.props.id)
    }

    render() {

        return (
            <div className='locationItem'
                 draggable={true}
                 onDragOver={this.props.onDragOver}
                 onDragStart={this.props.onDragStart}
                 onDrop={this.props.onDrop}
                 id={this.props.id}>

                <span>{this.props.title}</span>
                &nbsp;
                <button id='bClose' onClick={this.remove}>x</button>

            </div>
        );
    }

}

export default LocationItem;