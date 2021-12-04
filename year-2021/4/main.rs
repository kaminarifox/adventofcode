// https://adventofcode.com/2021/day/4
use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();
    let bingo_data: Vec<&str> = input.split("\n\n").collect();
    let bingo_sequence: Vec<i32> = bingo_data[0].split(",").map(|x| x.parse::<i32>().unwrap()).collect();
    let bingo_sequence_len = bingo_sequence.len();
    let mut bingo_cards: Vec<Vec<i32>> = Vec::new();

    for i in 1..bingo_data.len() {
        let card = bingo_data[i].split_whitespace().map(|x| x.parse::<i32>().unwrap()).collect();
        bingo_cards.push(card);
    }

    let mut winners: Vec<usize> = vec![];
    'sequence: for num in bingo_sequence {
        for (index, card) in bingo_cards.iter_mut().enumerate() {
            match card.iter().position(|x| *x == num) {
                Some(n) => {
                  card[n] = -1;
                },
                _ => {}
            }

            if winners.contains(&index) {
                continue;
            } else if winners.len() == bingo_sequence_len {
                break 'sequence;
            }

            if is_card_wins(card.to_vec()) {
                let sum: i32 = card.to_vec().into_iter().filter(|x| *x > 0).sum();
                winners.push(index);
                println!("{}", sum * num);
            }
        }
    }

}

fn is_card_wins(card: Vec<i32>) -> bool {
    for i in 0..5 {
        let mut in_row_marked = 0;
        let mut in_col_marked = 0;
        for j in 0..5 {
            if card[i * 5 + j] < 0 { in_row_marked += 1; }
            if card[j * 5 + i] < 0 { in_col_marked += 1; }
        }

        if in_row_marked == 5 || in_col_marked == 5 {
            return true;
        }
     }

    return false;
}


