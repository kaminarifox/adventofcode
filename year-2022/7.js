const crypto = require('crypto');

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

class FSObject {
    constructor(name, size = null) {
        this.name = name;
        this.size = size;
        this.data = '🎄🐸🎄';
    }

    get isDir() {
        return !this.size;
    }
}

class FSNode {
    constructor(id, object, parentId) {
        this.id = id;
        this.object = object;
        this.parentId = parentId ?? id;
    }
}

class FS {
    constructor(totalSpace) {
        this.nodes = new Map();

        const node = new FSNode(Symbol(crypto.randomUUID()), new FSObject('/'));
        this.nodes.set(node.id, node);
        this.root = node.id;
        this.cursor = node.id;
        this.totalSpace = totalSpace;
    }


    cd(path) {
        if (path === '/') {
            this.cursor = this.root;
        } else if (path === '..') {
            this.cursor = this.nodes.get(this.cursor).parentId;
        } else {
            for (const [nodeId, node] of this.nodes.entries()) {
                if (node.parentId === this.cursor && node.object.name === path) {
                    this.cursor = nodeId;
                    return;
                }
            }
        }
    }

    mkFile(name, size) {
        const file = new FSObject(name, size === 'dir' ? null : parseInt(size));
        const node = new FSNode(Symbol(crypto.randomUUID()), file, this.cursor)
        this.nodes.set(node.id, node);
    }

    // Ugly recursion 🫠
    getNodeSize(node) {
        if (!node) {
            node = this.nodes.get(this.root);
        }
        if (!node.object.size) {
            const dirChildNodes = []
            this.nodes.forEach(value => {
                if (value.id !== node.id && value.parentId === node.id) {
                    dirChildNodes.push(value);
                }
            })

            return dirChildNodes.reduce((p, c) => {
                if (!c.object.size) {
                    return p + this.getNodeSize(c);
                }

                return p + c.object.size;
            }, 0);
        }

        return node.object.size;
    }

    listDirs() {
        const list = [];
        this.nodes.forEach(node => {
            if (node.object.isDir) {
                list.push([this.getNodeSize(node), node.object.name])
            }
        });

        return list;
    }

    parse(fsStr) {
        let cmd = null, args = null;
        for (const line of fsStr.split('\n')) {
            const isShell = line.startsWith('$');
            if (isShell) {
                [, cmd, ...args] = line.split(' ');
            }
            switch (cmd) {
                case 'cd': {
                    this.cd(args[0]);
                    break;
                }
                case 'ls': {
                    if (!isShell) {
                        const [size, name] = line.split(' ');
                        this.mkFile(name, size);
                    }
                    break;
                }
            }
        }
    }
}

function main() {
    const fs = new FS(70000000);
    fs.parse(input);

    const dirs = fs.listDirs();

    // Part 1
    console.log(dirs.reduce((p, c) => {
        return c[0] > 100000 ? p : p + c[0];
    }, 0));

    // Part 2
    const usedSpace = fs.getNodeSize();
    dirs.sort((a, b) => a[0] - b[0]);
    for (const dir of dirs) {
        if ((fs.totalSpace - usedSpace + dir[0]) >= 30000000) {
            console.log(dir[0]);
            break;
        }
    }
}
main();
