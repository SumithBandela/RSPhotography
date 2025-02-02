import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import './qr-generator.css';

export function QrGenerator() {
    const [text, setText] = useState('');
    const [foregroundColor, setForegroundColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [qrGenerated, setQrGenerated] = useState(false); // Track QR code generation
    const canvasRef = useRef(null);

    const handleGenerateQRCode = () => {
        setError('');
        setLoading(true);
        setQrGenerated(false); // Reset QR generated state

        if (!text) {
            setError('Please enter text to generate QR code.');
            setLoading(false);
            return;
        }

        const canvas = canvasRef.current;
        QRCode.toCanvas(canvas, text, {
            width: 300,
            color: {
                dark: foregroundColor,
                light: backgroundColor,
            },
        })
            .then(() => {
                setLoading(false);
                setQrGenerated(true); // Mark QR code as generated
            })
            .catch((err) => {
                setLoading(false);
                setError('Failed to generate QR code.');
                console.error(err);
            });
    };

    const handleDownloadQRCode = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'qrcode.png';
            link.click();
        }
    };

    return (
        <div className='main'>
            <h1 style={{ fontFamily: ["Courier New", "Courier", "monospace"], color: "white" }} className='fw-bold m-3'>
                RS Photography QR Code Generator
            </h1>

            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to generate QR code"
            />

            <label htmlFor="foregroundColor" style={{ color: "white" }}>Foreground Color:</label>
            <select
                id="foregroundColor"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
            >
                <option value="#000000">Black</option>
                <option value="#ff0000">Red</option>
                <option value="#00ff00">Green</option>
                <option value="#0000ff">Blue</option>
                <option value="#ffff00">Yellow</option>
                <option value="#ff00ff">Magenta</option>
                <option value="#00ffff">Cyan</option>
                <option value="#800080">Purple</option>
                <option value="#ffa500">Orange</option>
                <option value="#808080">Gray</option>
                <option value="#ffffff">White</option>
            </select>

            <label htmlFor="backgroundColor" style={{ color: "white" }}>Background Color:</label>
            <select id="backgroundColor" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}>
                <option value="#ffffff">White</option>
                <option value="#000000">Black</option>
                <option value="#ff0000">Red</option>
                <option value="#00ff00">Green</option>
                <option value="#0000ff">Blue</option>
                <option value="#ffff00">Yellow</option>
                <option value="#ff00ff">Magenta</option>
                <option value="#00ffff">Cyan</option>
                <option value="#800080">Purple</option>
                <option value="#ffa500">Orange</option>
                <option value="#808080">Gray</option>
            </select>

            <button onClick={handleGenerateQRCode} className="btn btn-primary p-3 mt-3">Generate QR Code</button>

            {error && <div  className='mt-2 text-danger'>{error}</div>}

            {loading && (
                <div id="loading">
                    Generating QR code...
                </div>
            )}

            <div id="qrcode">
                <canvas ref={canvasRef}></canvas>
            </div>

            {qrGenerated && (
                <button onClick={handleDownloadQRCode} id="download" className='btn btn-primary mt-2 p-2'>
                    Download QR Code
                </button>
            )}
        </div>
    );
}

