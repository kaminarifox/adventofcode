const input = `bvwbjplbgvbhsrlpgdmjqwftvncz`;

const seqSize = 14;
for (let i = 0; i < input.length - seqSize; i++) {
    const buf = {};
    for (let j = 0; j < seqSize; j++)
        buf[input[i + j]] = true

    if (Object.keys(buf).length === seqSize) {
        console.log(buf, i + seqSize);
        break;
    }
}

