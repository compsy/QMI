import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import DropdownTypePreview from '../../components/previews/DropdownTypePreview'

configure({adapter: new Adapter()});

describe('<DropdownTypePreview/>', () => {
    it('renders a dropdown question', () => {
        const question = {
            id: "v5",
            type: "dropdown",
            title: "untitled dropdown",
            options: [
                {title: "hobby/sport", numeric_value: 0},
                {title: "werk", numeric_value: 25},
                {title: "vriendschap", numeric_value: 50},
            ],
        };
        const component = shallow(<DropdownTypePreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
