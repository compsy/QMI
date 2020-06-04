import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import TextFieldPreview from '../../components/previews/TextFieldPreview'

configure({adapter: new Adapter()});

describe('<TextField/>', () => {
    it('renders a textfield question', () => {
        const question = {
            section_start: "Tot slot",
            hidden: true,
            id: "v8",
            type: "textfield",
            title:
                "Wat zou jij willen verbeteren aan de webapp die je de afgelopen drie weken hebt gebruikt?",
            tooltip: "some tooltip",
            default_value: "Niks",
            pattern: "[a-z]{1,10}",
            hint: "Must be a lowercase word between 1 and 10 characters in length",
            placeholder: "Place holder",
            section_end: true,
        };
        const component = shallow(<TextFieldPreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});