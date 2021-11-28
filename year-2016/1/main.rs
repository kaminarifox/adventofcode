use std::fs;

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

    for action in input.split(", ") {
        coords.0 = if action.starts_with("R") { coords.0.next() } else { coords.0.prev() };
        let steps = (&action[1..]).parse::<i32>().unwrap_or(0);
        match coords.0 {
            Direction::T => coords.2 += steps,
            Direction::R => coords.1 += steps,
            Direction::D => coords.2 -= steps,
            Direction::L => coords.1 -= steps,
        }
    }

    println!("{:?}", coords);
}
