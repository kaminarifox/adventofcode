#include <stdio.h>
#include <string.h>
#define FIELD_SIZE 33

void main() {
    FILE *fptr = fopen("./input", "r");
    char field[FIELD_SIZE * FIELD_SIZE];

    for (int i = 0; i < FIELD_SIZE; i++) {
        char line[FIELD_SIZE];
        fgets(line, FIELD_SIZE * FIELD_SIZE, fptr);
        strncpy(field + FIELD_SIZE * i, line, FIELD_SIZE);
    }

    for (int i = 0; i < FIELD_SIZE; i++) {
        for (int j = 0; j < FIELD_SIZE; j++) {
            printf("%c", field[i * FIELD_SIZE + j]);
        }
        printf("\n");
    }
}

int detectAsteroids(int x, int y, char* field) {
    int visibleAsteroids = 0;


}