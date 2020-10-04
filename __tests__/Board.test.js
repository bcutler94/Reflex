import React from 'react';
import renderer from 'react-test-renderer';

import { Board } from '../components/Board';

describe('<Board />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Board />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});