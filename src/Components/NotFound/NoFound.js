import React from 'react';

const NoFound = () => {
    const errorStyle = {
        color:'rgb(255, 153, 0)',
        textAlign:'center'
    }
    return (
        <div style={errorStyle}>
            <h1>Page is not found</h1>
            <h3>404 Error</h3>
        </div>
    );
};

export default NoFound;