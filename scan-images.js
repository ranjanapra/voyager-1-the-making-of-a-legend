import fs from 'fs';
import path from 'path';

function getDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  let info = { size: buf.length, type: 'unknown', width: 0, height: 0, magic: buf.slice(0, 4).toString('hex') };
  
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    info.type = 'PNG';
    info.width = buf.readUInt32BE(16);
    info.height = buf.readUInt32BE(20);
  } else if (buf.slice(0, 3).toString() === 'GIF') {
    info.type = 'GIF';
    info.width = buf.readUInt16LE(6);
    info.height = buf.readUInt16LE(8);
  } else if (buf[0] === 0xff && buf[1] === 0xd8) {
    info.type = 'JPEG';
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xff) { offset++; continue; }
      const marker = buf[offset + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        info.height = buf.readUInt16BE(offset + 5);
        info.width = buf.readUInt16BE(offset + 7);
        break;
      }
      if (offset + 2 >= buf.length) break;
      const len = buf.readUInt16BE(offset + 2);
      offset += 2 + len;
    }
  }
  return info;
}

const dir = 'public/assets/images';
const files = fs.readdirSync(dir);
console.log('--- SCANNING public/assets/images ---');
for (const f of files) {
  const p = path.join(dir, f);
  if (fs.statSync(p).isFile()) {
    const dim = getDimensions(p);
    console.log(`${f} | ${dim.type} | ${dim.width}x${dim.height} | ${dim.size} bytes | magic:${dim.magic}`);
  }
}

const heroP = 'src/assets/hero.png';
if (fs.existsSync(heroP)) {
  const dim = getDimensions(heroP);
  console.log(`src/assets/hero.png | ${dim.type} | ${dim.width}x${dim.height} | ${dim.size} bytes | magic:${dim.magic}`);
}
