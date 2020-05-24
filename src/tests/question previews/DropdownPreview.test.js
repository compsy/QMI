import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import DropdownPreview from '../../components/previews/DropdownPreview'

configure({ adapter: new Adapter() });

describe('<DropdownPreview/>', () => {
    it('renders a dropdown question', () => {
        const question= {
            id: "v5",
            type: "dropdown",
            title: "untitled dropdown",
            options: [
                {title: "hobby/sport", numeric_value: 0},
                {title: "werk", numeric_value: 25},
                {title: "vriendschap", numeric_value: 50},
            ],
        };
        const component = shallow(<DropdownPreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});