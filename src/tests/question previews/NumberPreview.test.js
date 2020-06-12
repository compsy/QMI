import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import NumberTypePreview from '../../components/Editor/Question Previews/NumberTypePreview'

configure({adapter: new Adapter()});

describe('<NumberTypePreview/>', () => {
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
        const component = shallow(<NumberTypePreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
