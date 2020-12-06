use std::collections::HashMap;

static INPUT: &str = include_str!("input");

fn first() -> usize {
    let groups: Vec<&str> = INPUT.split("\n\n").collect();

    let mut out = 0;
    for group in groups.into_iter() {
        let mut group_vec = group.replace("\n", "").as_bytes().to_vec();
        group_vec.sort();
        group_vec.dedup();

        out += group_vec.len();
    }

    return out;
}

fn second() -> usize {
    let groups: Vec<&str> = INPUT.split("\n\n").collect();

    let mut out: usize = 0;
    for group in groups.into_iter() {
        let mut question_map = HashMap::new();
        for c in 'a'..='z' {
            question_map.insert(c, 0);
        }

        let group_vec: Vec<&str> = group.split("\n").collect();
        for member_answers in &group_vec {
            for c in member_answers.chars() {
                *question_map.get_mut(&c).unwrap() += 1;
            }
        }

        for (_k, v) in question_map {
            if v == group_vec.len() {
                out += 1;
            }
        }
    }

    return out;
}

fn main() {
    println!("{}", first());
    println!("{}", second());
}
