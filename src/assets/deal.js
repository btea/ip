import fs from 'fs';
import path from 'path';

const _p = './ip.txt';
const contet = fs.readFileSync(_p, 'utf-8');
const list = contet
    .split('apnic')
    .filter(s => !!s)
    .map(s => 'apnic' + s);
// fs.writeFileSync('./ip.js', 'export default ' + JSON.stringify(list), 'utf-8');
function CollectionNames() {
    const names = {};
    list.forEach(item => {
        const name = item.split('|')[1];
        if (!names[name]) {
            names[name] = true;
        }
    });
    const values = Object.keys(names);
    fs.writeFileSync('./area.js', `export default ${JSON.stringify(values, null, 2)}`, 'utf-8');
    console.log('收集地区名字');
}
CollectionNames();
