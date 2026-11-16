import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Keep the recorded UI unchanged. Add the same restrained window chrome used
// by DeviceFrame around each downloadable animation, including all five cases.
const all = ['evidence', 'parties', 'decision', 'wrong-item', 'missing-item', 'not-delivered', 'quality-complaint', 'late-delivery'];
const ids = process.argv.slice(2).length ? process.argv.slice(2) : all;
if (ids.some(id => !all.includes(id))) throw Error('Unknown Agent Desk recording');
const chunks = '.next/static/chunks';
const faces = fs.readdirSync(chunks).filter(f => f.endsWith('.css')).flatMap(f => fs.readFileSync(path.join(chunks, f), 'utf8').match(/@font-face\{font-family:DM Sans;[^}]+\}/g) || []);
const face = faces.find(f => f.includes('unicode-range:U+??'));
if (!face) throw Error('Build the portfolio first to make DM Sans available');
const font = path.resolve(chunks, face.match(/url\(([^)]+)\)/)[1]);
const fps = 8;
for (const id of ids) {
  const detailed = ['evidence', 'parties', 'decision'].includes(id);
  const prefix = 'public/portfolio/swiggy/' + (detailed ? 'device/' : 'media/') + id;
  const output = prefix + (detailed ? '-mockup' : '') + '.gif';
  const filter = `fps=${fps},scale=1080:675:flags=lanczos,pad=1082:708:1:32:color=0xd5dadd,drawbox=x=1:y=1:w=1080:h=30:color=0xf2f4f4:t=fill,drawtext=fontfile='${font}':text='Agent Desk':fontsize=11:fontcolor=0x62696c:x=15:y=11,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3`;
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', prefix + '.mp4', '-vf', filter, '-loop', detailed ? '0' : '-1', output]);
  const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', prefix + '.mp4'], { encoding: 'utf8' }).trim());
  const metadata = { id, source: id + '.mp4', method: 'Original recorded UI scaled proportionately inside neutral window chrome matching DeviceFrame; exported with FFmpeg', fps, frames: Math.round(duration * fps), duration, width: 1082, height: 708, sourceUI: 'Original fictional Agent Desk v7.1', device: 'Editorial application-window mockup, not deployed hardware' };
  fs.writeFileSync(prefix + '-mockup.json', JSON.stringify(metadata, null, 2) + '\n');
  console.log(id + ': ' + Math.round(fs.statSync(output).size / 1024) + ' KB');
}
