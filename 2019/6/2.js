const fs = require('fs');
const centres = [];
fs.readFileSync('input', {encoding: 'utf-8'}).split('\n').forEach(pair => {
    pair = pair.split(')');
    centres.push({p: pair[0], c: pair[1]});
});
const objects = {COM: {}};

function insertObject(obj, ancestor = 'COM') {
    centres.filter(item => item.p === ancestor).forEach(center => {
        if (objects[ancestor]) {
            objects[ancestor][center.c] = {};
        } else {
            objects[ancestor] = {[center.c]: {}};
        }
        insertObject(objects[center.c], center.c);
    })
}
insertObject(objects);

function findPath(obj, find) {
    const path = [];
    Object.keys(obj).forEach(key => {
        if (key === find) {
            path.push(find);
            return path;
        }
        path.push(...findPath(obj[key], find, path))
    });

    return path;
}

console.log(findPath(objects, 'YOU'));
