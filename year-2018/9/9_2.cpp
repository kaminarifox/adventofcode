#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {

    int PLAYERS = 428;
    int LAST = 72061 * 100;
    long int score[PLAYERS];

    for (int i = 0; i < PLAYERS; i++) {
        score[i] = 0;
    }

    std::vector<int> circle(1,0);

    int currentIndex  = 0;

    for (int i = 1; i <= LAST; i++) {

        if (i % 500000 == 0) {
          cout << i << endl; // Progress monitoring
        }

        int currentP = (i - 1) % PLAYERS;

        if (i % 23 == 0) {
            score[currentP] += i;
            currentIndex -= 7;
            currentIndex = currentIndex < 0 ? circle.size() + currentIndex : currentIndex;
            score[currentP] += circle[currentIndex];
            circle.erase(circle.begin() + currentIndex);
            continue;
        }

        int insert = currentIndex + 2;

        if (insert == circle.size()) {
            circle.push_back(i);
        } else if (insert > circle.size()) {
            insert = insert - circle.size();
            circle.insert(circle.begin() + insert, i);
        } else {
            circle.insert(circle.begin() + insert, i);
        }

        currentIndex = insert;
    }

    std::sort(score, score + PLAYERS);
    cout << score[PLAYERS - 1] << endl;

    return 0;
}
