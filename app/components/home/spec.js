import React from 'react';
import { Home } from './';
import sinon from 'sinon';

describe.only('Home component', () => {
  let component;
  
  beforeEach(() => { 
    component = shallow(
      <Home
        dispatch={() => {}}
        topArtistData={{
          artistData: [{
          name: "Radiohead",
            image: [
              {"#text": 'http://example.com/thom.jpg'},
              {"#text": 'http://example.com/thom.jpg'},
              {"#text": 'http://example.com/thom.jpg'},
              {"#text": 'http://example.com/thom.jpg'},
            ],
          }]
        }
        }
      />
    );
  });

  it('renders the topArtist list wrapper', () => {
    expect(component.find('.top-artist')).to.have.length(1);
  });

  it('renders the topArtist list', () => {
    expect(component.find('.top-artist__list').find('.top-artist__list-item')).to.have.length(1);
  });
  
  it('renders the image for the topArtist list item', () => {
    expect(component.find('.top-artist__image')).to.have.attr('src', 'http://example.com/thom.jpg')
  });

  it('renders the image for the topArtist name', () => {
    expect(component.find('.top-artist__name')).to.have.text('Radiohead')
  });
});
