// https://adventofcode.com/2021/day/9
use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();
    let mut heightmap: Vec<Vec<(i32, bool)>> = vec![];

    for line in input.lines() {
        let mut point_row: Vec<(i32, bool)> = vec![];
        for char in line.chars() {
            point_row.push((char.to_string().parse::<i32>().unwrap(), true));
        }
        heightmap.push(point_row);
    }

    for i in 0..heightmap.len() {
        for j in 0..heightmap[0].len() {
            check_ajacent(&mut heightmap, i, j);
        }
    }

    let mut basins: Vec<(usize, usize, i32)> = vec![];
    let mut risk_level = 0;
    for i in 0..heightmap.len() {
        for j in 0..heightmap[0].len() {
            if heightmap[i][j].1 {
                risk_level += heightmap[i][j].0 + 1;
                heightmap[i][j].1 = false;
                basins.push((i, j, 0));
            }
        }
    }

    for mut basin in basins.iter_mut() {
        basin.2 = inspect_basin(&mut heightmap, basin.0, basin.1);
    }

    println!("{:?}", basins);
    // basins.sort();

    println!("Part One {}", risk_level);
    // println!("Part Two {}", basins[0..3].iter().sum::<i32>());
}

fn check_ajacent(heightmap: &mut Vec<Vec<(i32, bool)>>, row: usize, col: usize) {
    let heightmap_row_size = heightmap.len();
    let heightmap_col_size = heightmap[0].len();
    let point_value = heightmap[row][col].0;

    // Check top
    if row > 0 && point_value >= heightmap[row - 1][col].0 {
        heightmap[row][col].1 = false;
        if heightmap[row - 1][col].1 {
            check_ajacent(heightmap, row - 1, col);
        }
    }

    // Check right
    if col < (heightmap_col_size - 1) && point_value >= heightmap[row][col + 1].0 {
        heightmap[row][col].1 = false;
        if heightmap[row][col + 1].1 {
            check_ajacent(heightmap, row,col + 1);
        }
    }

    // Check bottom
    if row < (heightmap_row_size - 1) && point_value >= heightmap[row + 1][col].0 {
        heightmap[row][col].1 = false;
        if heightmap[row + 1][col].1 {
            check_ajacent(heightmap, row + 1, col);
        }
    }

    // Check left
    if col > 0 && point_value >= heightmap[row][col - 1].0 {
        heightmap[row][col].1 = false;
        if heightmap[row][col - 1].1 {
            check_ajacent(heightmap, row, col - 1);
        }
    }
}

fn inspect_basin(heightmap: &mut Vec<Vec<(i32, bool)>>, row: usize, col: usize) -> i32 {
    let heightmap_row_size = heightmap.len();
    let heightmap_col_size = heightmap[0].len();
    let point_value = heightmap[row][col].0;
    let mut basin_size = 0;

    if row > 0 && !heightmap[row - 1][col].1 {
        if heightmap[row - 1][col].0 > point_value {
            basin_size += 1;
            basin_size += inspect_basin(heightmap, row - 1, col);
        } else {
            heightmap[row - 1][col].1 = true;
        }
    }

    if col < (heightmap_col_size - 1) && !heightmap[row][col + 1].1 {
        if heightmap[row][col + 1].0 > point_value {
            basin_size += 1;
            basin_size += inspect_basin(heightmap, row, col + 1);
        } else {
            heightmap[row][col + 1].1 = true;
        }
    }

    if row < (heightmap_row_size - 1) && !heightmap[row + 1][col].1 {
        if heightmap[row + 1][col].0 > point_value {
            basin_size += 1;
            basin_size += inspect_basin(heightmap, row + 1, col);
        } else {
            heightmap[row + 1][col].1 = true;
        }
    }

    if col > 0  && !heightmap[row][col - 1].1 {
        if heightmap[row][col - 1].0 > point_value {
            basin_size += 1;
            basin_size += inspect_basin(heightmap, row, col - 1);
        } else {
            heightmap[row][col - 1].1 = true;
        }
    }

    return basin_size;
}
