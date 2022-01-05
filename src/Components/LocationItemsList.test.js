import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import LocationItem from "./LocationItem";
import LocationItemsList from "./LocationItemsList";

Enzyme.configure({adapter: new Adapter()})

let list = [
    {id: 0, title: 'a1', desc: 'a1', coords: [1, 1]}
    ,{id: 1, title: 'a2', desc: 'a2', coords: [2, 2]}
]
const wrapper = shallow(
    <LocationItemsList
        orderUpdated={(list) => {}}
        list={list}
        onRemovePosition={(id) => {}}/>)

describe('LocationItem', () => {
    it('1', () => {
        const a = wrapper.find("span")
        expect(a).toHaveLength(2)
        expect(a.text()).toEqual('a1')
        const b = wrapper.find("button")
        expect(b).toHaveLength(1)
        expect(b.text()).toEqual('x')
        wrapper.find('button').simulate('click')
    })

    it('2', () => {
        wrapper.find('button').simulate('click')
        const a = wrapper.find("span")
        expect(a).toHaveLength(1)
    })

})