#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int* loadCode() {
    FILE *fptr = fopen("./input", "r");
    if (fptr == NULL) {
        printf("Input file not found!\n");
        exit(1);
    }

    char opcode[10] = "";
    int* buffer = malloc(sizeof(int));
    int len = 1;

    while (1) {
        char c = fgetc(fptr);
        if (c == ',' || c == EOF) {
            buffer[len - 1] = atoi(opcode);
            buffer = realloc(buffer, (len + 1) * sizeof(int));
            len++;
            opcode[0] = '\0';
        } else {
            strncat(opcode, &c, 1);
        }

        if (c == EOF) {
            fclose(fptr);
            break;
        }
    }

    return buffer;
}

void main() {
    int* code = loadCode();
}
