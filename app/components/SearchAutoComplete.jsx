import React, { Component, PropTypes } from 'react'
import SearchAutoCompleteSection from '../components/SearchAutoCompleteSection'

//this component should probably be treated as a top level component
//It should perhaps be connected to the redux store
//reasons: 
  //it needs to dispatch an event when a new track is clicked on 
  //it needs to disptach when a artist is clicked on and also change route
  //it needs to dispatch when an album is clicked on and also change route
export default class SearchAutoComplete extends Component {
    render() {
        let { artists , tracks , albums, currentSearch }  = this.props;
        if(artists.length || tracks.length || albums.length) { 

            return (
              <div className="autocomplete">
                <SearchAutoCompleteSection title="Artists" data={artists} />
                <SearchAutoCompleteSection title="Tracks" data={tracks} />
                <SearchAutoCompleteSection title="Album" data={albums} />
              </div>
            )
        } else {
            return null;
        }
    }
}