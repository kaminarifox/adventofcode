// https://adventofcode.com/2021/day/8
use std::fs;

struct SegmentDigit {
    num: i32,
    seg_count: i32,
    variations: Vec<String>,
}

impl SegmentDigit {
    fn make_variations(len: i32, parts: Vec<char>) -> Vec<String> {
        let mut out: Vec<String> = vec![];


        for l in 0..len {
            for i in parts.len() {
                let mut part = String::new(parts[i]);

                let parts_next = parts.clone();
                parts_next.remove(i);

                for j in parts_next.len() {


                }
            }
        }



        for i in 0..len {

            let part =

            for j in 0..len {
                for k in 0..parts.len() {
                    let mut part =
                }
            }
        }

        for char in parts {
            for i in 0..len {
                let mut next_parts = parts.clone();
                next_parts.remove(next_parts.iter().position(|x| *x == char));

                if next_parts
            }
        }

        return out;
    }

    pub fn new(num: i32) -> Self {
        let parts = match num {
            1 => 2,
            7 => 3,
            4 => 4,
            2 | 3 | 5 => 5,
            6 |9 => 6,
            8 => 7,
        };

        SegmentDigit { num, parts, variations: Self::make_variations(parts) }
    }
}



fn main() {

}
