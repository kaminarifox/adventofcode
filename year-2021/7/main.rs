// https://adventofcode.com/2021/day/7
use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().
        to_string();
    let crabs: Vec<i32> = input.split(",").map(|x| x.parse::<i32>().unwrap()).collect();

    let mut costs: Vec<(i32, i32)> = vec![];
    for i in 0..500 {
        let mut cost = 0;

        for crab in crabs.iter() {
            if false { // Part One
                cost += (crab - i).abs();
            } else { // Part Two
                for j in 1..=(crab - i).abs() {
                    cost += j;
                }
            }
        }

        costs.push((i, cost));
    }

    costs.sort_by(|a, b| a.1.partial_cmp(&b.1).unwrap());

    println!("{:?}", costs[0]);
}
