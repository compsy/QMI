import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import TextAreaTypePreview from '../../components/previews/TextAreaTypePreview'

configure({adapter: new Adapter()});

describe('<TextAreaTypePreview/>', () => {
    it('renders a textarea question', () => {
        const question = {
            section_start: "Tot slot",
            hidden: true,
            id: "v6",
            type: "textarea",
            title:
                "Wat zou jij willen verbeteren aan de webapp die je de afgelopen drie weken hebt gebruikt?",
            tooltip: "some tooltip",
            placeholder: "Place holder",
            section_end: true,
        };
        const component = shallow(<TextAreaTypePreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});
