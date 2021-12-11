// https://adventofcode.com/2021/day/10

extern crate regex;

use std::fs;

fn main() {
    let input = fs::read_to_string("examples/10/input.txt").unwrap().trim_end().to_string();
    let simple_envelope = regex::Regex::new(r"(\[\])|(\{\})|<>|(\(\))").unwrap();
    let close_regex = regex::Regex::new(r"[\]\)\}>]").unwrap();

    let mut corrupted_points = 0;
    let mut completed_points_vec: Vec<u128> = vec![];

    for line in input.lines() {
        let mut replaced = simple_envelope.replace_all(line, "").to_string();
        while simple_envelope.is_match(replaced.as_str()) {
            replaced = simple_envelope.replace_all(replaced.as_str(), "").to_string();
        }

        if close_regex.is_match(replaced.as_str()) {
            let capture = close_regex.captures(replaced.as_str()).unwrap();
            corrupted_points += match capture.get(0).unwrap().as_str() {
                ")" => 3,
                "]" => 57,
                "}" => 1197,
                ">" => 25137,
                _ => 0
            }
        } else {
            let mut points: u128 = 0;
            for char in replaced.chars().rev() {
                let char_points = match char {
                    '(' => 1,
                    '[' => 2,
                    '{' => 3,
                    '<' => 4,
                    _ => 0
                };
                points = points * 5 + char_points;
            }
            completed_points_vec.push(points as u128);
        }
    }
    println!("{}", corrupted_points);

    completed_points_vec.sort();
    println!("{:?}", completed_points_vec[completed_points_vec.len() / 2]);
}
