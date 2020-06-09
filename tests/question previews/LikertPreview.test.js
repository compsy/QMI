import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import LikertTypePreview from '../../src/components/Editor/Question Previews/LikertTypePreview'

configure({adapter: new Adapter()});

describe('<LikertTypePreview/>', () => {
    it('renders a likert question', () => {
        const question = {
            id: "v4",
            type: "likert",
            title: "untitled likert",
            options: [
                {title: "hobby/sport"},
                {title: "werk"},
                {title: "vriendschap"},
            ],
        };
        const component = shallow(<LikertTypePreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
