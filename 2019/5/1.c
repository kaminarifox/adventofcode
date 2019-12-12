#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void loadCode(int** buffer, int* len) {
    FILE *fptr = fopen("./input", "r");
    if (fptr == NULL) {
        printf("Input file not found!\n");
        exit(1);
    }

    char opcode[10] = "";
    *buffer = malloc(0);
    *len = 0;

    char c;
    do {
        c = fgetc(fptr);
        if (c != ',' && c != EOF) {
            strncat(opcode, &c, 1);
        } else {
            printf("%d", *len);
            *buffer[*len] = 1; //atoi(opcode);
            *len += 1;
            *buffer = (int*) realloc(*buffer, 1000 * sizeof(int));
            opcode[0] = '\0';      
        }
      
    } while (c != EOF);
    
    fclose(fptr);

}

void main() {
    int* buffer;
    int len;
    loadCode(&buffer, &len);
}
