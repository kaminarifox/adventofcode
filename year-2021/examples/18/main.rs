// https://adventofcode.com/2021/day/18

extern crate eval;

use eval::{eval, to_value};

#[derive(Debug)]
enum SNumberNode<'a> {
    Node(&'a SNumber<'a>),
    Value(u32),
    None
}

#[derive(Debug)]
struct SNumber<'a> {
    left: Option<&'a SNumberNode<'a>>,
    right: Option<&'a SNumberNode<'a>>,
}

impl<'a> SNumber<'a> {
    pub fn new(left: &'a SNumberNode, right: &'a SNumberNode) -> SNumber<'a> {
        return SNumber { left: Some(&left), right: Some(&right) }
    }

    pub fn new_empty() -> SNumber<'a> {
        return SNumber { left: None, right: None };
    }

    // pub fn set_left(&mut self, node: SNumberNode) {
    //     self.left = Some(&node);
    // }
}

fn main() {
    // let n1 = SNumber { left: &SNumberNode::Value(1), right: &SNumberNode::Value(2) };
    // let node_ref = &SNumberNode::Node(&n1);
    // let n2 = SNumber::new(&SNumberNode::Value(3),node_ref);
    // println!("{:?}", n2);

    let t = eval("(1,2,(3,4))");
    println!("{:?}", t);

    // let mut n= SNumber::new_empty();
    // parse_node("[[1,2],3]", &mut n);
}

// fn parse_node<'a>(number_str: &'a str, number: &'a mut SNumber<'a>) {
//     let unwrapped_str = &number_str[1..number_str.len() - 1];
//
//     let mut bracket_indices = (0, 0);
//     let mut pivot_index = 0;
//
//     for (index, char) in unwrapped_str.chars().enumerate() {
//         if char == '[' {
//             bracket_indices.0 += 1;
//         } else if char == ']' {
//             bracket_indices.1 += 1;
//         }
//
//         if bracket_indices.0 == bracket_indices.1 {
//             pivot_index = index + 1;
//             break;
//         }
//     }
//
//     let mut parts = unwrapped_str.split_at(pivot_index);
//     parts.1 = &parts.1[1..];
//
//     if parts.0.len() == 1 {
//         let l_node = SNumberNode::Value(parts.0.parse::<u32>().unwrap());
//         number.set_left(l_node);
//     } else {
//         // let mut new_l_part = SNumber::new_empty();
//         // parse_node(parts.0, &mut new_l_part);
//         // l_part = SNumberNode::Node(&new_l_part);
//     }
//
//     if parts.1.len() == 1 {
//         // number.left = Some(&SNumberNode::Value(parts.1.parse::<u32>().unwrap()));
//     } else {
//         // let mut new_r_part = SNumber::new_empty();
//         // parse_node(parts.1, &mut new_r_part);
//         // r_part = SNumberNode::Node(&new_r_part);
//     }
//
// }
