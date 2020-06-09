import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import RadioCheckboxTypePreview from '../../src/components/Editor/Question Previews/RadioCheckboxTypePreview'

configure({adapter: new Adapter()});

describe('<RadioCheckboxTypePreview/>', () => {
    it('renders a checkbox question', () => {
        const question = {
            id: "v2",
            type: "checkbox",
            title: "untitled checkbox",
            options: ["option 1", "option 2", "option 3", "option 4"],
        };
        const component = shallow(<RadioCheckboxTypePreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
