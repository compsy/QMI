import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import NumberPreview from '../../components/previews/NumberPreview'

configure({adapter: new Adapter()});

describe('<NumberPreview/>', () => {
    it('renders a number question', () => {
        const question = {
            id: "v9",
            type: "number",
            title: "untitled number",
            placeholder: 5132,
            min: 10,
            max: 100,
            maxlength: 4,
        };
        const component = shallow(<NumberPreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
