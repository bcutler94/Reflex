import React from 'react';
import renderer from 'react-test-renderer';
import { Score } from '../components/Score';

describe('<Score />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Score />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});