import React, {Component} from "react";
import { YMaps, Map, ObjectManager, Polyline, GeoObject} from "react-yandex-maps";

import "./PMap.css";


class PMap extends Component {
    mapState = {
        center: [55.751574, 37.573856],
        zoom: 5
    }

    points = [
        {title: "P 1",descr: "d1",coords: [55.831903, 37.411961]},
        {title: "P 1",descr: "d1",coords: [55.763338, 37.565466]}
    ]

    mapLoaded(ymaps) {
        // Creating a polyline using the GeoObject class.
        var myGeoObject = new GeoObject({
            // Describing the geometry of the geo object.
            geometry: {
                // The "Polyline" geometry type.
                type: "LineString",
                // Specifying the coordinates of the vertices of the polyline.
                coordinates: [
                    [55.80, 37.50],
                    [55.70, 37.40]
                ]
            },
            // Defining properties of the geo object.
            properties:{
                // The contents of the hint.
                hintContent: "I'm a geo object",
                // The contents of the balloon.
                balloonContent: "You can drag me"
            }
        }, {
            /**
             * Setting the geo object options.
             *  Enabling drag-n-drop for the polyline.
             */
            draggable: true,
            // The line color.
            strokeColor: "#FFFF00",
            // Line width.
            strokeWidth: 5
        });

        // Creating a polyline using the Polyline auxiliary class.
        var myPolyline = new Polyline([
            // Specifying the coordinates of the vertices of the polyline.
            [55.80, 37.50],
            [55.80, 37.40],
            [55.70, 37.50],
            [55.70, 37.40]
        ], {
            /**
             * Describing the properties of the geo object.
             *  The contents of the balloon.
             */
            balloonContent: "Polyline"
        }, {
            /**
             * Setting options for the geo object. Disabling the close button on a balloon.
             *
             */
            balloonCloseButton: false,
            // The line color.
            strokeColor: "#000000",
            // Line width.
            strokeWidth: 4,
            // The transparency coefficient.
            strokeOpacity: 0.5
        });

        // Adding lines to the map.
        console.log(Reflect.ownKeys(ymaps.Map));

        //ymaps.Map.geoObjects.add(myGeoObject).add(myPolyline);
    }

    render() {

        return (
            <div className="mapsContainer">

                <YMaps query={{ mode: "debug" }}>

                    <Map defaultState={this.mapState}
                         height="100%"
                         width="100%"
                         onLoad = {this.mapLoaded}
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
        );
    }

}

export default PMap;