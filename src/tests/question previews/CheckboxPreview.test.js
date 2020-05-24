import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import RadioCheckboxPreview from '../../components/previews/RadioCheckboxPreview'

configure({ adapter: new Adapter() });

describe('<RadioCheckboxPreview/>', () => {
    it('renders a number question', () => {
        const question= {
            id: "v2",
            type: "checkbox",
            title: "untitled checkbox",
            options: ["option 1", "option 2", "option 3", "option 4"],
        };
        const component = shallow(<RadioCheckboxPreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
