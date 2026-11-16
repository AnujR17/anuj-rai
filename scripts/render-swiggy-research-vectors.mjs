import fs from 'node:fs';
import path from 'node:path';

// A new reading layout of the supplied research, not a historical FigJam export.
const chunks = '.next/static/chunks';
const faces = fs.readdirSync(chunks).filter(file => file.endsWith('.css')).flatMap(file => fs.readFileSync(path.join(chunks, file), 'utf8').match(/@font-face\{font-family:DM Sans;[^}]+\}/g) || []);
if (!faces.length) throw Error('Build the site first to make DM Sans available.');
const fonts = [...new Set(faces)].map(face => face.replace(/url\(([^)]+)\)/, (_, url) => 'url(data:font/woff2;base64,' + fs.readFileSync(path.resolve(chunks, url)).toString('base64') + ')')).join('');
const ink = '#242522', paper = '#ffffff', pale = '#f2f4f4', line = '#d5dadd';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 20, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${escape(value)}</text>`;
const lines = (x, y, values, size = 20, extra = '') => values.map((value, i) => text(x, y + i * (size + 7), value, size, extra)).join('');
const box = (x, y, w, h, fill = paper) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${line}"/>`;
const connector = d => `<path d="${d}" fill="none" stroke="${line}" stroke-width="2"/>`;
function save(id, w, h, title, description, body) {
  fs.writeFileSync(`public/portfolio/swiggy/diagrams/${id}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title description"><title id="title">${escape(title)}</title><desc id="description">${escape(description)}</desc><style>${fonts}text{font-family:'DM Sans',sans-serif;font-weight:400;fill:${ink}}.strong{font-weight:500}</style>${body}</svg>\n`);
}
const groups = [
  ['Understand', [['Read the bot', 'handover'], ['Identify what', 'went wrong'], ['Check when', 'it happened']]],
  ['Investigate', [['Look for proof'], ['Check past refunds'], ['Consider who', 'is at fault']]],
  ['Respond', [['Choose an amount'], ['Seek restaurant', 'agreement'], ['Explain the outcome']]],
];
const modelDescription = 'A new reading layout of the original inferred nine-step agent mental model: read the bot handover, identify the issue, check timing, look for proof, check past refunds, consider fault, choose an amount, seek restaurant agreement, and explain the outcome. The research treated history as context rather than a published refund condition, and agreement as a dependency. Later versions replaced live permission with standing terms. No agents were observed for this model.';
save('mental-model', 960, 560, 'Inferred agent mental model', modelDescription,
  groups.map(([heading, steps], i) => {
    const x = 20 + i * 314;
    return box(x, 12, 292, 350, pale) + text(x + 20, 54, heading, 25, 'class="strong"') + steps.map((step, n) => box(x + 16, 78 + n * 92, 260, 72) + lines(x + 32, 107 + n * 92, step, 20)).join('') + connector(`M${x + 146} 150V170M${x + 146} 242V262`);
  }).join('') + connector('M312 44H334M626 44H648') +
  box(20, 400, 450, 138) + text(42, 438, 'History is context', 25, 'class="strong"') + lines(42, 476, ['Past refunds are not a published', 'refund condition.']) +
  box(490, 400, 450, 138) + text(512, 438, 'Agreement is a dependency', 25, 'class="strong"') + lines(512, 476, ['Later changed to standing terms', 'in the working model.'])
);
save('mental-model-mobile', 360, 1150, 'Inferred agent mental model', modelDescription,
  groups.map(([heading, steps], i) => {
    const y = 12 + i * 270;
    return box(12, y, 336, 250, pale) + text(30, y + 38, heading, 25, 'class="strong"') + steps.map((step, n) => box(28, y + 58 + n * 58, 304, 46) + text(42, y + 88 + n * 58, step.join(' '), 20)).join('');
  }).join('') + connector('M180 262V282M180 532V552') +
  box(12, 840, 336, 120) + text(30, 879, 'History is context', 24, 'class="strong"') + lines(30, 914, ['Past refunds are not a', 'published refund condition.'], 20) +
  box(12, 980, 336, 152) + lines(30, 1018, ['Agreement is', 'a dependency'], 24, 'class="strong"') + lines(30, 1083, ['Later changed to standing', 'terms in the working model.'], 20)
);
const stakeholderDescription = 'A new reading layout of the original stakeholder analysis. The agent chooses a response. The customer receives a remedy or denial; restaurant and rider records help investigate the claim and potential responsibility. The platform carries refund and review implications. Regulators and consumer courts provide external grievance routes. This is a stakeholder relationship map, not a claim that these services are integrated into the prototype.';
const parties = [
  ['Customer', ['Refund, coupon or denial', 'Their account and evidence']],
  ['Restaurant', ['Order and packing records', 'Potential refund cost']],
  ['Delivery partner', ['Trip events and their account', 'Potential responsibility']],
];
save('stakeholders', 960, 570, 'Stakeholders around a refund decision', stakeholderDescription,
  box(330, 12, 300, 74, pale) + text(480, 57, 'Escalation agent', 26, 'text-anchor="middle" class="strong"') + connector('M480 86V112') + box(330, 112, 300, 64) + text(480, 152, 'Chooses a response', 25, 'text-anchor="middle"') + connector('M480 176V210M160 242V210H800V242M480 210V242') +
  parties.map(([title, detail], i) => { const x = 20 + i * 320;return box(x, 242, 280, 134) + text(x + 18, 279, title, 25, 'class="strong"') + lines(x + 18, 319, detail, 18); }).join('') +
  text(20, 417, 'Wider service, beyond this workspace', 22, 'class="strong"') + box(20, 438, 440, 112, pale) + text(40, 476, 'Swiggy', 25, 'class="strong"') + text(40, 515, 'Bot handover, refund cost and review', 20) + box(500, 438, 440, 112, pale) + text(520, 476, 'External recourse', 25, 'class="strong"') + text(520, 515, 'Regulators and consumer courts', 20)
);
save('stakeholders-mobile', 360, 970, 'Stakeholders around a refund decision', stakeholderDescription,
  box(28, 12, 304, 74, pale) + text(180, 57, 'Escalation agent', 26, 'text-anchor="middle" class="strong"') + connector('M180 86V116') + box(28, 116, 304, 64) + text(180, 157, 'Chooses a response', 25, 'text-anchor="middle"') + connector('M180 180V208H14V550M14 285H28M14 415H28M14 545H28') +
  parties.map(([title, detail], i) => { const y = 230 + i * 130;return box(28, y, 320, 110) + text(46, y + 34, title, 25, 'class="strong"') + lines(46, y + 67, detail, 19); }).join('') +
  lines(12, 650, ['Wider service, beyond', 'this workspace'], 22, 'class="strong"') + box(12, 704, 336, 110, pale) + text(30, 739, 'Swiggy', 25, 'class="strong"') + lines(30, 774, ['Bot handover, refund cost', 'and review'], 20) +
  box(12, 836, 336, 110, pale) + text(30, 873, 'External recourse', 25, 'class="strong"') + lines(30, 909, ['Regulators and consumer courts'], 19)
);
console.log('Rendered four responsive research SVGs from the supplied mental-model and stakeholder records.');
