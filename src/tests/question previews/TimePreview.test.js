import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import TimePickerPreview from '../../components/previews/TimePickerPreview'

configure({adapter: new Adapter()});

describe('<TimePickerPreview/>', () => {
    it('renders a time question', () => {
        const question = {
            id: "v10",
            type: "time",
            hours_from: 3,
            hours_to: 6,
            hours_step: 1,
            title:
                "Hoeveel tijd heb je deze week besteed aan de begeleiding van deze student movai pilon?",
        };
        const component = shallow(<TimePickerPreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});