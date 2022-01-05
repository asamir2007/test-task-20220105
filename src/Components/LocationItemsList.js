import "./LocationItemsList.css";

import React, {Component} from "react";
import LocationItem from "./LocationItem";


class LocationItemsList extends Component {
    constructor(props) {
        super(props)
        this.dragStart = this.dragStart.bind(this)
        this.dragEnter = this.dragEnter.bind(this)
        this.dragDrop = this.dragDrop.bind(this)
        this.componentUpdated = this.componentUpdated.bind(this)
        this.state={list:this.props.list}
        this.componentUpdated()
    }


    componentDidUpdate() {
        this.componentUpdated()
    }

    componentUpdated() {
        let l = this.props.list;
        for (let i = 0; i < l.length; i++) {
            l[i].order = i
        }
    }

    dragStart(e) {
        //console.log('dragStart ' + e.currentTarget.id)
        this.setState({dragId: e.currentTarget.id})
    }

    dragEnter() {
    }

    dragDrop(e) {
        //console.log('drop '+e.currentTarget.id)
        let l = this.props.list;

        const dragItem = l.find((a) => a.id+'' === this.state.dragId)
        const dropItem = l.find((a) => a.id+'' === e.currentTarget.id)

        let dropItemOrder = dropItem.order
        let dragItemOrder = dragItem.order
        for (let i = 0; i < l.length; i++) {
            if (l[i].id+'' === this.state.dragId) {
                l[i].order = dropItemOrder
            }
            if (l[i].id+'' === e.currentTarget.id) {
                l[i].order = dragItemOrder
            }
        }
        this.setState({list: l})
        this.props.orderUpdated(l)
    }

    render() {
        return (
            <div>
                <div id='itemsList'>
                    {this.state.list.sort((a, b) => a.order - b.order).map(item => (
                        <LocationItem
                            key={item.id}
                            title={item.title}
                            id={item.id}
                            onRemovePosition={(id) => this.props.onRemovePosition(id)}
                            onDragOver={(ev) => ev.preventDefault()}
                            onDragStart={this.dragStart}
                            onDrop={this.dragDrop}
                        />
                    ))}
                </div>
            </div>
        );
    }

}

export default LocationItemsList;