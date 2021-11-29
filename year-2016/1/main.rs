use std::fs;
use std::process;

#[derive(Debug)]
enum Direction {
    T, R, D, L,
}

impl Direction {
    pub fn next(&self) -> Direction {
        match *self {
            Direction::T => Direction::R,
            Direction::R => Direction::D,
            Direction::D => Direction::L,
            Direction::L => Direction::T,
        }
    }

    pub fn prev(&self) -> Direction {
        match *self {
            Direction::T => Direction::L,
            Direction::L => Direction::D,
            Direction::D => Direction::R,
            Direction::R => Direction::T,
        }
    }
}

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();
    let mut coords = (Direction::T, 0, 0);
    let mut path: Vec<(i32, i32)> = vec!();

    path.push((0,0));
    for action in input.split(", ") {
        coords.0 = if action.starts_with("R") { coords.0.next() } else { coords.0.prev() };
        let steps = (&action[1..]).parse::<i32>().unwrap_or(0);

        for _i in 0..steps {
            match coords.0 {
                Direction::T => coords.2 += 1,
                Direction::R => coords.1 += 1,
                Direction::D => coords.2 -= 1,
                Direction::L => coords.1 -= 1,
            }

            // Second part
            if true {
                let second_visited = path.iter().position(|i| i.0 == coords.1 && i.1 == coords.2);
                match second_visited {
                    None => (),
                    Some(i) => {
                        println!("{:?}", path[i]);
                        process::exit(0);
                    },
                };
            }

            path.push((coords.1, coords.2));
        }
    }

    println!("{:?}", coords);
}
