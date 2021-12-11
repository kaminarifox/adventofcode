// https://adventofcode.com/2021/day/3
use std::fs;

const RATE_LEN: usize = 12;

fn main() {
    let input: Vec<i32> = fs::read_to_string("./input.txt").unwrap().trim_end()
        .lines().map(|num| isize::from_str_radix(num, 2).unwrap() as i32).collect();

    // println!("Part One: {}", part_one(input));
    println!("Part Two: {}", part_two(input));
}

fn part_one(input: Vec<i32>) -> i32 {
    let input_len = input.len();
    let mut bits_quantity: [i32; RATE_LEN] = [0; RATE_LEN];

    for val in input {
        for i in (0..RATE_LEN).rev() {
            if (1 << i) & val != 0 {
                bits_quantity[i] += 1;
            }
        }
    }
    bits_quantity.reverse();

    let mut h_rate = 0;
    let mut y_rate = 0;
    for i in 0..RATE_LEN {
        let bit = if bits_quantity[i] * 2 > input_len as i32 { 1 } else { 0 };
        h_rate = h_rate | bit << RATE_LEN - i - 1;
        y_rate = y_rate | (bit ^ 1) << RATE_LEN - i - 1;
    }

    return h_rate * y_rate;
}

fn part_two(input: Vec<i32>) -> i32 {
    let mut most_common: Vec<i32> = input.clone();
    let mut less_common: Vec<i32> = input.clone();
    let mut rates = (0, 0);

    for i in (0..RATE_LEN).rev() {
        let mut mc_criteria = (0, 0);
        let mut lc_criteria = (0, 0);

        for num in &most_common {
            if num & (1 << i) == 0 { mc_criteria.0 += 1; } else { mc_criteria.1 += 1; }
        }
        for num in &less_common {
            if num & (1 << i) == 0 { lc_criteria.0 += 1; } else { lc_criteria.1 += 1; }
        }

        if mc_criteria.0 > mc_criteria.1 {
            most_common = most_common.into_iter().filter(|x| x & (1 << i) == 0).collect();
        } else {
            most_common = most_common.into_iter().filter(|x| x & (1 << i) != 0).collect();
        }

        if lc_criteria.0 > lc_criteria.1 {
            less_common = less_common.into_iter().filter(|x| x & (1 << i) != 0).collect();
        } else {
            less_common = less_common.into_iter().filter(|x| x & (1 << i) == 0).collect();
        }

        if most_common.len() == 1 {
            rates.0 = most_common[0];
        }
        if less_common.len() == 1 {
            rates.1 = less_common[0];
        }
    }

    return rates.0 * rates.1;
}
