import fs from 'node:fs';
import path from 'node:path';

// Reuse the portfolio's built DM Sans subsets so each SVG is self-contained.
const chunks = '.next/static/chunks';
const faces = fs.readdirSync(chunks).filter(file => file.endsWith('.css')).flatMap(file =>
  fs.readFileSync(path.join(chunks, file), 'utf8').match(/@font-face\{font-family:DM Sans;[^}]+\}/g) || []
);
if (!faces.length) throw new Error('Build the portfolio first to make DM Sans available.');
const fontCSS = [...new Set(faces)].map(face => face.replace(/url\(([^)]+)\)/, (_, url) => {
  const font = fs.readFileSync(path.resolve(chunks, url));
  return 'url(data:font/woff2;base64,' + font.toString('base64') + ')';
})).join('');
const ink = '#242522', paper = '#ffffff', accent = '#242522', line = '#d5dadd';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 20, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${esc(value)}</text>`;
const box = (x, y, w, h, fill = paper) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${line}"/>`;
const connector = d => `<path d="${d}" fill="none" stroke="${line}" stroke-width="2"/>`;
function svg(width, height, title, description, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description"><title id="title">${esc(title)}</title><desc id="description">${esc(description)}</desc><style>${fontCSS}text{font-family:'DM Sans',sans-serif;font-weight:400;fill:${ink}}.strong{font-weight:500}.light{fill:${paper}}</style>${body}</svg>\n`;
}
const out = 'public/portfolio/swiggy/diagrams';
fs.mkdirSync(out, { recursive: true });
const save = (name, w, h, title, description, body) => fs.writeFileSync(out + '/' + name + '.svg', svg(w, h, title, description, body));
const areas = [
  ['Case records', 'Order and timeline', 'Customer evidence', 'Party history'],
  ['Conversation', 'Customer, rider, restaurant', 'Messages and call notes', 'Party records'],
  ['Checks and decision', 'Policy checks', 'History summary', 'Fault, action and reason'],
];
const mapDescription = 'My Workspace contains Assigned, On hold, Shelved and Closed. Opening a ticket brings together case records, conversation, and checks and decision. The open-case queue stays alongside the workspace. This is an explanatory map of the existing prototype.';
save('architecture', 960, 560, 'Agent Desk information architecture', mapDescription,
  box(240, 12, 480, 96) + text(480, 49, 'My Workspace', 28, 'text-anchor="middle" class="strong"') + text(480, 82, 'Assigned / On hold / Shelved / Closed', 20, 'text-anchor="middle"') +
  connector('M480 108V146') + box(340, 146, 280, 64, accent) + text(480, 187, 'Open a ticket', 25, 'text-anchor="middle" class="light"') + connector('M480 210V248M160 274V248H800V274M480 248V274') +
  areas.map(([title, ...items], i) => box(20 + i * 320, 274, 280, 202) + text(40 + i * 320, 314, title, 24, 'class="strong"') + items.map((item, row) => text(40 + i * 320, 355 + row * 35, item, i === 1 && row === 0 ? 18 : 20)).join('')).join('') +
  text(480, 530, 'The queue rail keeps open cases in reach', 21, 'text-anchor="middle"')
);
save('architecture-mobile', 360, 762, 'Agent Desk information architecture', mapDescription,
  box(16, 8, 328, 104) + text(180, 44, 'My Workspace', 26, 'text-anchor="middle" class="strong"') + text(180, 74, 'Assigned / On hold', 20, 'text-anchor="middle"') + text(180, 99, 'Shelved / Closed', 20, 'text-anchor="middle"') +
  connector('M180 112V144') + box(52, 144, 256, 60, accent) + text(180, 183, 'Open a ticket', 25, 'text-anchor="middle" class="light"') + connector('M180 204V222H22V602M22 302H44M22 452H44M22 602H44') +
  areas.map(([title, ...items], i) => box(44, 240 + i * 150, 300, 124) + text(60, 270 + i * 150, title, 23, 'class="strong"') + items.map((item, row) => text(60, 299 + i * 150 + row * 26, item, 19)).join('')).join('') +
  text(180, 717, 'Open cases remain in', 21, 'text-anchor="middle"') + text(180, 744, 'the queue rail', 21, 'text-anchor="middle"')
);
const costDescription = 'Worked fictional example SW-2070: the agent chooses Restaurant and Full refund. The affected combo is 220 rupees, GST is 11, delivery is 25 and packaging is 10, giving 266 rupees. With the restaurant terms set to No refunds, the project model allocates 266 rupees to Swiggy and zero to the restaurant. These terms and the cost allocation are project assumptions.';
const amountRows = [['Affected combo', '₹220'], ['5% GST', '₹11'], ['Delivery + packaging', '₹35']];
function calculation(x, y, w) {
  return connector(`M${x} ${y}H${x + w}`) + text(x + 24, y + 42, 'Customer remedy', 28, 'class="strong"') + text(x + 24, y + 77, 'Full refund chosen by agent', 19) +
    amountRows.map(([label, value], i) => text(x + 24, y + 124 + i * 38, label, 20) + text(x + w - 24, y + 124 + i * 38, value, 23, 'text-anchor="end"')).join('') + connector(`M${x + 24} ${y + 224}H${x + w - 24}`) + text(x + 24, y + 281, 'Refund', 21) + text(x + w - 24, y + 287, '₹266', 44, 'text-anchor="end" class="strong"');
}
function allocation(x, y, w) {
  return connector(`M${x} ${y}H${x + w}`) + text(x + 24, y + 42, 'Who pays', 28, 'class="strong"') + text(x + 24, y + 83, 'Restaurant terms:', 20) + text(x + 24, y + 113, 'No refunds', 23) + text(x + 24, y + 180, 'Swiggy', 23) + text(x + w - 24, y + 187, '₹266', 44, 'text-anchor="end" class="strong"') + text(x + 24, y + 238, 'Restaurant', 20) + text(x + w - 24, y + 238, '₹0', 23, 'text-anchor="end"');
}
save('refund-cost', 960, 430, 'A customer remedy and its cost allocation', costDescription,
  text(20, 34, 'SW-2070, missing item', 22) + calculation(20, 66, 450) + allocation(510, 66, 430)
);
save('refund-cost-mobile', 360, 710, 'A customer remedy and its cost allocation', costDescription,
  text(16, 30, 'SW-2070, missing item', 20) + calculation(16, 52, 328) + allocation(16, 410, 328)
);
const findingsDescription = 'Sixteen unresolved findings in one Claude-led heuristic evaluation: three major, nine minor and four cosmetic. These are review findings, not measured user failures or improvements.';
const severities = [['Major', 3, accent], ['Minor', 9, '#7f8b93'], ['Cosmetic', 4, '#d5dadd']];
let offset = 20;
const bars = severities.map(([, count, colour]) => { const w = count / 16 * 920; const result = `<rect x="${offset}" y="30" width="${w}" height="56" fill="${colour}"/>`; offset += w; return result; }).join('');
save('findings', 960, 200, 'Heuristic findings by severity', findingsDescription,
  bars + severities.map(([label, count], i) => text(20 + i * 320, 151, String(count), 46, 'class="strong"') + text(78 + i * 320, 147, label, 23)).join('')
);
save('findings-mobile', 360, 330, 'Heuristic findings by severity', findingsDescription,
  severities.map(([label, count, colour], i) => text(16, 35 + i * 108, label, 23) + text(344, 35 + i * 108, String(count), 30, 'text-anchor="end" class="strong"') + `<rect x="16" y="54" width="328" height="20" fill="#edf0f1" transform="translate(0 ${i * 108})"/><rect x="16" y="${54 + i * 108}" width="${count / 9 * 328}" height="20" fill="${colour}"/>`).join('')
);
console.log('Exported six responsive SVGs with embedded portfolio DM Sans.');
