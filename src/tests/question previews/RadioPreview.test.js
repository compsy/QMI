import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import RadioCheckboxTypePreview from '../../components/Editor/Question Previews/RadioCheckboxTypePreview'

configure({adapter: new Adapter()});

describe('<RadioCheckboxTypePreview/>', () => {
    it('renders a radio question', () => {
        const question = {
            id: "v12",
            type: "radio",
            title: "Hello Kitty",
            options: ["option 1", "option 22", "option 3", "option 4"],
        };
        const component = shallow(<RadioCheckboxTypePreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
