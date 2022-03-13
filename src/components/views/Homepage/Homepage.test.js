import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  loadingStatus: {
    active: false,
    error: false,
  },
  allPosts: [
    {
      _id: 123,
      authorId: '123456789',
      releaseTime: Date.now(),
      title: 'tytuł wcześniejszego ogłoszenia',
      content: 'jakiś tam tekst',
    },
    {
      _id: 345,
      authorId: '123456789',
      releaseTime: Date.now() + 1000,
      title: 'tytuł późniejszego ogłoszenia',
      content:'jakiś jeszcze inny tekst',
    },
    {
      _id: 567,
      authorId: '1234567',
      releaseTime: Date.now() + 2000,
      title: 'tytuł jeszcze późniejszego ogłoszenia',
      content:'Kto wymyśli jakiś tekst???',
    },
  ],
  location: {
    state: {
      userId: false,
    },
  },
  user: {},
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
