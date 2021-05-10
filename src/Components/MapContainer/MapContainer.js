import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    const containerStyle = {
      width: '50%',
      height: '50%'
    }

    return (
      <Map
        containerStyle={containerStyle}
        google={this.props.google}
        initialCenter={{
          lat: 23.6850,
          lng: 90.3563
        }}
        zoom={8}>
        <Marker onClick={this.onMarkerClick}
           />
        <InfoWindow onClose={this.onInfoWindowClose}>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAZIuGrDcwbHZfSg0N3FNUwlZJnIo6CsAE")
})(MapContainer)