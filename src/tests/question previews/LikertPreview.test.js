import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import LikertPreview from '../../components/previews/LikertPreview'

configure({ adapter: new Adapter() });

describe('<LikertPreview/>', () => {
    it('renders a likert question', () => {
        const question= {
            id: "v4",
            type: "likert",
            title: "untitled likert",
            options: [
                {title: "hobby/sport"},
                {title: "werk"},
                {title: "vriendschap"},
            ],
        };
        const component = shallow(<LikertPreview question={question}/>);
        // expect(component).toMatchSnapshot();
    });
});
