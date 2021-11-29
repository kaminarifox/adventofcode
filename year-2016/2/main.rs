use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap().trim_end().to_string();
    let mut position = 5;

    for line in input.lines() {
        for letter in line.chars() {
            match letter {
                'U' => {
                    if position != 1 && position != 2 && position != 3 {
                        position -= 3;
                    }
                },
                'R' => {
                    if position != 3 && position != 6 && position != 9 {
                        position += 1;
                    }
                },
                'D' => {
                    if position != 7 && position != 8 && position != 9 {
                        position += 3;
                    }
                },
                'L' => {
                    if position != 1 && position != 4 && position != 7 {
                        position -= 1;
                    }
                },
                _ => (),
            }
        }
        
        print!("{} ", position);
    }


}

