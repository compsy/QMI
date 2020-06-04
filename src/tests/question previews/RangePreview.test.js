import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import RangePreview from '../../components/previews/RangePreview'

configure({adapter: new Adapter()});

describe('<RangePreview/>', () => {
    it('renders a range question', () => {
        const question = {
            section_start: "De hoofddoelen",
            hidden: true,
            id: "v7",
            type: "range",
            min: 0,
            max: 200,
            step: 10,
            title: "Was het voor jou duidelijk ?",
            tooltip: "some tooltip",
            labels: ["helemaal niet duidelijk", "heel duidelijk"],
            section_end: true,
        };
        const component = shallow(<RangePreview question={question}/>);
        expect(component).toMatchSnapshot();
    });
});