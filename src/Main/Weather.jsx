import React from 'react';

export default function Weather() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <iframe
                src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=122,12.5,2800"
                title="Earth Weather - Philippines"
                style={{
                    border: 'none',
                    width: '100%',
                    height: 'calc(100vh - 90px)',
                    overflow: 'hidden'
                }}
                allowFullScreen
            ></iframe>
        </div>
    );
}
