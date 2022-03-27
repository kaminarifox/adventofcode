use std::fs;

#[derive(Debug)]
struct Display {
    digits: Vec<String>
}

impl Display {
    fn new() -> Self {
        Display { digits: vec![String::new(); 10] }
    }

    fn resolve_wires(&mut self, sample: &Vec<&str>) {
        self.digits[1] = sample.into_iter().find(|x| x.len() == 2).unwrap().to_string();
        self.digits[4] = sample.into_iter().find(|x| x.len() == 4).unwrap().to_string();
        self.digits[7] = sample.into_iter().find(|x| x.len() == 3).unwrap().to_string();
        self.digits[8] = sample.into_iter().find(|x| x.len() == 7).unwrap().to_string();

        // Find three
        self.digits[3] = sample.into_iter().filter(|x| x.len() == 5)
            .find(|x| self.diff(self.digits[7].clone(), x.to_string()).len() == 2).unwrap().to_string();

        // Find six
        self.digits[6] = sample.into_iter().filter(|x| x.len() == 6)
            .find(|x| {
                !x.contains(self.digits[1].chars().nth(0).unwrap()) || !x.contains(self.digits[1].chars().nth(1).unwrap())
            }).unwrap().to_string();

        // Find two and five
        sample.into_iter().filter(|x| x.len() == 5).for_each(|x| {
            if self.diff(self.digits[6].clone(), x.to_string()).len() == 1 {
                self.digits[5] = x.to_string();
            } else if self.digits[3].ne(x) {
                self.digits[2] = x.to_string();
            }
        });

        // Find zero and nine
        sample.into_iter().filter(|x| x.len() == 6).for_each(|x| {
            let diff = self.diff(self.digits[3].clone(), x.to_string());
            if diff.len() == 1 {
                self.digits[9] = x.to_string();
            } else if self.digits[6].ne(x) {
                self.digits[0] = x.to_string();
            }
        });
    }

    fn diff(&self, src: String, dest: String) -> Vec<char> {
        let mut out: Vec<char> = vec![];

        for char in ['a', 'b', 'c', 'd', 'e', 'f', 'g'] {
            if src.contains(char) ^ dest.contains(char) {
                out.push(char);
            }
        }

        return out;
    }

    fn decode(&self, number: &str) -> i32 {
        self.digits.iter()
            .position(|x| self.diff(x.clone(), number.to_string()).len() == 0).unwrap() as i32
    }
}

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();
    let mut firs_result = [0, 0, 0, 0, 0];
    let mut second_result = 0;

    for line in input.lines() {
        let input_split = line.split(" | ");
        let digits_samples: Vec<&str> = input_split.clone().nth(0).unwrap().split(' ').collect();
        let encoded_numbers: Vec<&str> = input_split.clone().nth(1).unwrap().split(' ').collect();

        let mut display = Display::new();
        display.resolve_wires(&digits_samples);

        let mut decoded_number= String::new();
        for encoded_number in encoded_numbers {
            let decoded_digit = display.decode(encoded_number);
            decoded_number.push_str(decoded_digit.to_string().as_str());
            match decoded_digit {
                1 => firs_result[0] += 1,
                4 => firs_result[1] += 1,
                7 => firs_result[2] += 1,
                8 => firs_result[3] += 1,
                _ => { }
            }
        }
        second_result += decoded_number.parse::<i32>().unwrap();
    }

    println!("{:?}", firs_result.iter().sum::<i32>());
    println!("{}", second_result);
}

