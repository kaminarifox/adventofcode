use std::process::exit;

static INPUT: &str = include_str!("input");

struct Opcode {
    cmd: String,
    operand: i32,
    exec_number: usize,
}

struct Cpu {
    rom: Vec<Opcode>,
    acc: i32,
    pc: i32,
}

impl Cpu {
    pub fn init(input: &str) -> Self {
        let mut rom = vec![];
        let opcodes = input.split('\n').collect::<Vec<&str>>();
        for opcode in opcodes {
            let command = opcode.split(' ').collect::<Vec<&str>>();
            rom.push(Opcode {
                cmd: command[0].to_string(),
                operand: command[1].parse::<i32>().unwrap(),
                exec_number: 0,
            });
        }

        return Self { rom, acc: 0, pc: 0 };
    }

    pub fn next(&mut self, next_pc: i32) {
        let mut opcode = self.rom.get_mut(self.pc as usize).unwrap();
        opcode.exec_number += 1;
        self.pc += next_pc;
    }

    pub fn run(&mut self) {
        loop {
            if self.rom[self.pc as usize].exec_number == 1 {
                println!("FAIL: {}", self.acc);
                break;
            }

            let operand = self.rom[self.pc as usize].operand;

            match self.rom[self.pc as usize].cmd.as_str() {
                "nop" => self.next(1),
                "acc" => {
                    self.acc += operand;
                    self.next(1);
                }
                "jmp" => self.next(operand),
                "end" => {
                    println!("EXIT: {}", self.acc);
                    exit(0)
                }
                _ => (),
            }
        }
    }
}

fn main() {
    // First puzzle
    let mut cpu = Cpu::init(INPUT);
    cpu.run();
    println!("\n");

    // Second puzzle
    for m in INPUT.match_indices("jmp") {
        let mut input = String::from(INPUT);
        input.replace_range(m.0..m.0 + 3, "nop");
        let mut cpu = Cpu::init(input.as_str());
        cpu.run();
    }
}
