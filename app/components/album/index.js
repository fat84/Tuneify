import React from 'react'
import { connect } from 'react-redux'
import { 
  clearAlbumPageError, 
  getAlbumPageData, 
  clearAlbumPageData 
} from '../../actions/album-actions'
import prepareUrlParamForUse from '../../utils/prepare-url-param-for-use'

class Album extends React.Component {
  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 album period
  componentDidMount() {
    this.getAlbumData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.album !== this.props.params.album) {
      // TODO:  investigate whether getAlbumPageData action creator
      // can use a thunk as well as using promise middleware
      // if so we can just dispatch one action instead of three here
      this.props.dispatch(clearAlbumPageData());
      this.props.dispatch(clearAlbumPageError());
      this.getAlbumData(nextProps);
    }
  }

  getAlbumData(props) {
    const album = prepareUrlParamForUse(
      props.params.album
    );

    const artist = prepareUrlParamForUse(
      props.params.artist
    );

    this.props.dispatch(
      getAlbumPageData(
        album, 
        artist
      )
    );
  } 

  renderTracks() {
    if(this.props.albumPage.tracks) {
      return (
        this.props.albumPage.tracks.map((track, i) => {
          return (
            <li key={i}>{track.name}</li>
          )
        })
      )
    } else {
      return null;
    }
  }

  render() {
    const {
      currentAlbum,
      albumPage,
      currentAlbumPageError,
    } = this.props;
    
    if (albumPage) {
      // sometimes lastfm returns successfully but with an empty 
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      if(albumPage.error) {
        return(
          <h3>No album found for this search result.</h3>
        )
      } else {
        return (
          <div>
            <h3>{albumPage.name}</h3>
            <h4>{albumPage.artist}</h4>
            <img 
              src={albumPage.image} 
              alt={`${albumPage.name} by ${albumPage.artist}`} 
            />
            <ul>
              {this.renderTracks()}
            </ul>
          </div>
        );
      }
    } else if(currentAlbumPageError) {
      return(
        <h3>No album found for this search result.</h3>
      );
    } else {
      return (
        <div className="spinner" />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    currentAlbum: state.currentAlbum,
    albumPage: state.albumPage,
    currentAlbumPageError: state.currentAlbumPageError,
  }
}

export default connect(mapStateToProps)(Album);