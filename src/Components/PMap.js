import React, {Component} from "react";
import {YMaps, Map, ObjectManager, Polyline, GeoObject} from "react-yandex-maps";

import "./PMap.css";


class PMap extends Component {
    constructor(props) {
        super(props);
        this.bc = this.bc.bind(this)
    }
    mapState = {
        center: [55.751574, 37.573856],
        zoom: 9
    }

    points = [
        {title: "P 1", descr: "d1", coords: [55.831903, 37.411961]},
        {title: "P 1", descr: "d1", coords: [55.763338, 37.565466]}
    ]

    mapLoaded(ymaps) {
    }

    bc() {
        this.points = [{title: "P 1", descr: "d1", coords: [55.763338, 37.565466]}]
        this.setState({a:Math.random()});

    }

    render() {
        console.log('render')

        return (
            <div>
                <button onClick={this.bc}>111111111111</button>
                <div className="mapsContainer">
                    <YMaps query={{mode: "debug"}}>

                        <Map defaultState={this.mapState}
                             height="100%"
                             width="100%"
                             onLoad={this.mapLoaded}
                        >
                            <ObjectManager
                                objects={{
                                    openBalloonOnClick: true
                                }}


                                defaultFeatures={{
                                    type: "FeatureCollection",
                                    features: this.points.map((point, id) => {
                                        return {
                                            id: id,
                                            type: "Feature",
                                            geometry: {
                                                type: "Point",
                                                coordinates: point.coords
                                            },
                                            properties: {
                                                balloonContent: `<a href="#${id}">Больше информации...</a>`
                                            }
                                        };
                                    })
                                }}
                                modules={[
                                    "objectManager.addon.objectsBalloon",
                                    "objectManager.addon.clustersBalloon"
                                ]}
                            />

                            <Polyline
                                geometry={[
                                    [55.8, 37.5],
                                    [55.8, 37.4],
                                    [55.7, 37.5],
                                    [55.7, 37.4],
                                ]}
                                options={{
                                    balloonCloseButton: false,
                                    strokeColor: '#000',
                                    strokeWidth: 4,
                                    strokeOpacity: 0.5,
                                }}
                            />

                        </Map>
                    </YMaps>
                </div>

            </div>

        );
    }

}

export default PMap;