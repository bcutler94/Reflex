import React from 'react';
import renderer from 'react-test-renderer';
import { FTUE, GameOver } from '../components/Popups';

describe('<Poups />', () => {
    it('FTUE renders correctly', () => {
        const tree = renderer.create(<FTUE />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('GameOver renders correctly', () => {
        const tree = renderer.create(<GameOver />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});