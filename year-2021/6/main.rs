// https://adventofcode.com/2021/day/5
use std::fs;

const FISH_DAYS: i32 = 256;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();
    let sushi_set: Vec<i32> = input.split(",").map(|x| x.parse::<i32>().unwrap()).collect();

    fn count_fishes(fish: i32, initial_day: i32) -> u128 {
        let mut buffer = [0; 300];
        buffer[fish as usize] = 1;

        for i in 0..initial_day {
            if buffer[i as usize] > 0 {
                buffer[(i + 7) as usize] += buffer[i as usize];
                buffer[(i + 9) as usize] += buffer[i as usize];
            }
        }

        let len: u128 = buffer.iter().sum::<u128>();

        return len + 1;
    }

    let mut total: u128 = 0;
    for fish in sushi_set {
        total += count_fishes(fish, FISH_DAYS) as u128;
    }

    // Why i should divide by 2?? (╯°□°)╯︵ ┻━┻
    println!("{}", total / 2);
}
