import React, {Component} from "react";


import "./YMap.css";


class YMap extends Component {
    map
    maps
    marks = []
    path = null

    /**
     *
     * @param props {mapRef()}
     */
    constructor(props) {
        super(props);
        this.mapInit = this.mapInit.bind(this)
        this.getCenter = this.getCenter.bind(this)
        this.addMark = this.addMark.bind(this)
        this.removeMark = this.removeMark.bind(this)
        this.redrawPath = this.redrawPath.bind(this)
        this.removeAllMarks = this.removeAllMarks.bind(this)
        this.addMarks = this.addMarks.bind(this)

        props.set_mapRef(this)
    }

    getCenter() {
        return this.map.getCenter()
    }

    removeMark(id) {
        let m = this.marks
        for (var i = 0; i < m.length; i++) {
            if (m[i].m.id === id) {
                this.map.geoObjects.remove(m[i].pm);
                m.splice(i, 1)
                break
            }
        }
        this.redrawPath()
    }

    addMark(mark) {
        let placemark = new this.maps.Placemark(mark.coords, {
            //iconContent: mark.title,
            balloonContentHeader: 'описание:',
            balloonContent: mark.desc
        }, {// eslint-disable-line
            preset: 'islands#greenStretchyIcon',
            draggable: true
        });

        let t = this
        let mk = {m: mark, pm: placemark}

        placemark.events.add(['dragend'], function (e) {
            mk.m.coords = e.originalEvent.target.geometry._coordinates
            t.redrawPath()
        })

        this.marks.push(mk)
        this.map.geoObjects.add(placemark)
        this.redrawPath()
    }

    removeAllMarks() {
        let m = this.marks
        for (var i = 0; i < m.length; i++) {
            this.map.geoObjects.remove(m[i].pm);
        }
        this.marks = []
    }

    addMarks(list) {
        for (const a in list) {
            this.addMark(list[a])
        }
    }

    redrawPath() {
        if (this.path !== null) this.map.geoObjects.remove(this.path)

        if (this.marks.length < 2) return

        let pathCoords = []

        let m = this.marks
        for (let i = 0; i < m.length; i++) {
            pathCoords.push(m[i].m.coords)
        }
        this.path = new ymaps.Polyline(pathCoords,// eslint-disable-line
            {}, {
                balloonCloseButton: false,
                strokeColor: "#000000",
                strokeWidth: 4,
                strokeOpacity: 0.5,
                draggable: false
            });

        this.map.geoObjects.add(this.path);

    }

    componentDidMount() {
        let t = this
        window.addEventListener('load', () => {
            function checkYmaps() {
                if (typeof ymaps == 'undefined') {// eslint-disable-line
                    console.log('maps not ready - retry')
                    setTimeout(checkYmaps, 100)
                    return
                }
                t.maps = ymaps// eslint-disable-line
                t.maps.ready(t.mapInit);
            }

            checkYmaps()
        })
    }

    mapInit() {
        // Creating the map.
        this.map = new this.maps.Map("map", {// eslint-disable-line
            center: [55.751574, 37.573856],
            zoom: 9
        });

    }

    render() {
        return (
            <div>
                <div className="mapsContainer">
                    <div id="map"></div>
                </div>
            </div>
        );
    }

}

export default YMap;