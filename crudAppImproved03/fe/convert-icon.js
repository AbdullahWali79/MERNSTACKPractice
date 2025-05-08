const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

async function convertSvgToIco() {
    // Create a canvas
    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');

    // Draw a green background
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, 256, 256);

    // Draw a white cross
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 32;
    ctx.lineCap = 'round';
    
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(128, 48);
    ctx.lineTo(128, 208);
    ctx.stroke();
    
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(48, 128);
    ctx.lineTo(208, 128);
    ctx.stroke();

    // Save as PNG first
    const pngBuffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'public', 'temp.png'), pngBuffer);

    // Convert PNG to ICO
    const icoBuffer = await pngToIco(path.join(__dirname, 'public', 'temp.png'));
    fs.writeFileSync(path.join(__dirname, 'public', 'icon.ico'), icoBuffer);

    // Clean up temporary PNG file
    fs.unlinkSync(path.join(__dirname, 'public', 'temp.png'));
}

convertSvgToIco().catch(console.error); 