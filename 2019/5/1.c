#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void loadCode(int* buffer, int* len) {
    FILE *fptr = fopen("./input", "r");
    if (fptr == NULL) {
        printf("Input file not found!\n");
        exit(1);
    }

    char opcode[10] = "";
    buffer = malloc(sizeof(int));
    *len = 1;

    while (1) {
        char c = fgetc(fptr);
        if (c == ',' || c == EOF) {
            buffer[*len - 1] = atoi(opcode);
            printf("%d ",  buffer[*len - 1]);
            // FIXME: Remove realloc on EOF
            buffer = realloc(buffer, (*len + 1) * sizeof(int));
            *len += 1;
            opcode[0] = '\0';
        } else {
            strncat(opcode, &c, 1);
        }

        if (c == EOF) {
            fclose(fptr);
            break;
        }
    }
}

void main() {
    int* buffer;
    int len;
    loadCode(buffer, &len);
}
