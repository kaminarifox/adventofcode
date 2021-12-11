// https://adventofcode.com/2021/day/1
use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();

    let mut lines: Vec<i32> = input.lines().collect::<Vec<&str>>().iter()
        .map(|n| { n.parse::<i32>().unwrap() }).collect();
    
    if true { // Part Two
        let mut lines_triplet = vec![0; lines.len() - 2];
        for i in 0..lines_triplet.len() {
            lines_triplet[i] = (&lines[i..i + 3]).iter().sum();
        }

        lines = lines_triplet;
    }

    let mut increases = 0;
    for i in 1..lines.len() {
        if lines[i] > lines[i - 1] {
            increases += 1;
        }
    }

    println!("{}", increases);
}
