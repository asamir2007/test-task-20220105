import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import LocationItem from "./LocationItem";

Enzyme.configure({ adapter: new Adapter() })

describe('LocationItem', () => {
    it('1', () => {
        const wrapper = shallow(
            <LocationItem
                key="1"
                title="a1"
                id="1"
                onRemovePosition={() => {}}
                onDragOver={()=>{}}
                onDragStart={()=>{}}
                onDrop={()=>{}}
            />)

        const a = wrapper.find("span")
        expect(a).toHaveLength(1)
        expect(a.text()).toEqual('a1');
        const b = wrapper.find("button")
        expect(b).toHaveLength(1)
        expect(b.text()).toEqual('x');

    })

})