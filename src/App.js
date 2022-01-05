import React from "react";
import {Helmet} from "react-helmet";

import './App.css';
import TextField from "./Components/TextField";
import LocationItemsList from "./Components/LocationItemsList";
import YMap from "./Components/YMap";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.addPosition = this.addPosition.bind(this)
        this.onRemovePosition = this.onRemovePosition.bind(this)
        this.onItemsOrderUpdated = this.onItemsOrderUpdated.bind(this)
        this.state = {
            list: []
        }
    }

    mapRef
    currentPositionId = 0

    addPosition = (a) => {
        if (a.value.length<1) {
            alert('введите название точки')
            return;
        }
        let l = this.state.list
        this.currentPositionId += 1
        let mark = {id: this.currentPositionId, title: a.value.substr(0,12), desc:a.value, coords: this.mapRef.getCenter()}
        l.push(mark)
        this.mapRef.addMark(mark)
        this.setState({list: l})

    }

    onRemovePosition(id) {
        let l = this.state.list
        for (var i = 0; i < l.length; i++) {
            if (l[i].id === id) {
                l.splice(i, 1)
                break
            }
        }
        this.mapRef.removeMark(id)

        this.setState({list: l})
    }

    onItemsOrderUpdated(list){
        this.mapRef.removeAllMarks()
        this.mapRef.addMarks(list.sort((a, b) => a.order - b.order))
    }

    render() {
        return (
            <div className="App">
                <Helmet>
                    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
                </Helmet>
                <div id='mapControls'>
                    <TextField handleEnter={this.addPosition}/>
                    <LocationItemsList orderUpdated={this.onItemsOrderUpdated} list={this.state.list} onRemovePosition={this.onRemovePosition}/>
                </div>
                <div id='mapItself'>
                    <YMap set_mapRef={(a) => {
                        this.mapRef = a
                    }}/>
                </div>
            </div>
        )
    }
}

export default App;
