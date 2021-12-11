// https://adventofcode.com/2021/day/2
use std::fs;

struct Position {
    aim: i32,
    distance: i32,
    depth: i32,
}

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();
    let mut position = Position {aim: 0, distance: 0, depth: 0};

    if false {
        for line in input.lines() {
            let command: Vec<&str> = line.split_whitespace().collect();
            let value = command[1].parse::<i32>().unwrap();
            match command[0] {
                "forward" => position.distance += value,
                "up" => position.depth -= value,
                "down" => position.depth += value,
                _ => (),
            }
        }
    } else { // Part two
        for line in input.lines() {
            let command: Vec<&str> = line.split_whitespace().collect();
            let value = command[1].parse::<i32>().unwrap();
            match command[0] {
                "forward" => {
                    position.distance += value;
                    position.depth += position.aim * value;
                },
                "up" => position.aim -= value,
                "down" => position.aim += value,
                _ => (),
            }
        }
    }


    println!("{}", position.distance * position.depth);
}
