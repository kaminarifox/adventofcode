const fs = require('fs');
const centres = [];
fs.readFileSync('input', {encoding: 'utf-8'}).split('\n').forEach(pair => {
    pair = pair.split(')');
    centres.push({p: pair[0], c: pair[1]});
});
const objects = {COM: {}};

let c = 0;
function insertObject(obj, ancestor = 'COM', depth = 1) {
    centres.filter(item => item.p === ancestor).forEach(center => {
        if (objects[ancestor]) {
            objects[ancestor][center.c] = {};
        } else {
            objects[ancestor] = {[center.c]: {}};
        }
        c += depth;
        insertObject(objects[center.c], center.c, depth + 1);
    })
}
insertObject(objects);

console.log(c);
