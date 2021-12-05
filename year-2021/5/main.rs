// https://adventofcode.com/2021/day/5
use std::fs;

const FIELD_SIZE: usize = 1000;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();
    let mut points = vec![0; FIELD_SIZE * FIELD_SIZE];

    for line in input.lines() {
        let coords = line.split(" -> ").collect::<Vec<&str>>();
        let mut coords_start: Vec<i32> = coords[0].split(',').map(|x| x.parse::<i32>().unwrap()).collect();
        let coords_end: Vec<i32> = coords[1].split(',').map(|x| x.parse::<i32>().unwrap()).collect();

        // Part One
        // if coords_start[0] != coords_end[0] && coords_start[1] != coords_end[1] {
        //     continue;
        // }

        points[(coords_start[1] * FIELD_SIZE as i32 + coords_start[0]) as usize] += 1;
        loop {
            if coords_start[0] < coords_end[0] {
                coords_start[0] += 1;
            } else if coords_start[0] > coords_end[0] {
                coords_start[0] -= 1;
            }

            if coords_start[1] < coords_end[1] {
                coords_start[1] += 1;
            } else if coords_start[1] > coords_end[1] {
                coords_start[1] -= 1;
            }

            points[(coords_start[1] * FIELD_SIZE as i32 + coords_start[0]) as usize] += 1;

            if coords_start[0] == coords_end[0] && coords_start[1] == coords_end[1] {
                break;
            }
        }
    }

    let covered_points: Vec<i32> = points.into_iter().filter(|x| *x > 1).collect();
    println!("{}", covered_points.len());
}



