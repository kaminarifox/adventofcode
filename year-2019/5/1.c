#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int loadCode(int **buffer, FILE *fptr) {
    int size = 0, *tmpBuf = calloc(0, sizeof(int));
    char c, opcode[10] = "";

    do {
        c = fgetc(fptr);
        if (c != ',' && c != EOF) {
            strncat(opcode, &c, 1);
        } else {
            size += 1;
            int *extBuf = realloc(tmpBuf, size * sizeof(int));
            if (extBuf == NULL) {
                printf("Buffer allocation error!");
                exit(1);
            }
            extBuf[size - 1] = atoi(opcode);
            opcode[0] = '\0';
            tmpBuf = extBuf;
        }

    } while (c != EOF);
    *buffer = tmpBuf;

    return size;
}

void main() {
    FILE *fptr = fopen("./input", "r");
    if (fptr == NULL) {
        printf("Input file not found!\n");
        exit(1);
    }

    int *buffer;
    int size = loadCode(&buffer, fptr);


    int ptr = 0;
    int opcode = buffer[ptr];

    while (opcode != 99) {
        switch (opcode) {
            case 1:
                buffer[ptr + 3] = buffer[ptr + 1] + buffer[ptr + 2];
                ptr += 4;
                break;
            case 2:
                buffer[ptr + 3] = buffer[ptr + 1] * buffer[ptr + 2];
                ptr += 4;
                break;
            case 3:
                int input;
                scanf("$d", &input);
                buffer[ptr + 1] = input;
                ptr += 2;
                break;
            case 4:
                printf("$d\n", buffer[ptr + 1]);
                ptr += 2;
                break;
            default:
                printf("Invalid opcode [%d]", opcode);
                break;
        }
        opcode = buffer[ptr];
    }

    fclose(fptr);
    free(buffer);
}
