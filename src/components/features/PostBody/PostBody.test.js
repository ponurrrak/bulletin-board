import React from 'react';
import { shallow } from 'enzyme';
import { PostBodyComponent } from './PostBody';

const mockProps = {
  loadingStatus: {
    active: false,
    error: false,
  },
  newPost: {
    _id: '123',
    releaseTime: Date.now(),
    updateTime: Date.now(),
    title: 'Marvellous occasion! Old newspapers that nobody needs with attractive price!',
    content: 'Recently I have found those shit and I want to sell it. Won\'t you buy it? Don\'t be a fool!',
    authorId: '123456789',
    email: 'test@test.pl',
    status: 'published',
    price: 33.5,
    location: 'Some Big City',
    phone: '771234567',
    photo: 'avatar.png',
    version: 0,
  },
};

describe('Component PostBody', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostBodyComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
