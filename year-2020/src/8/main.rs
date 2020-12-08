use std::process::exit;

static INPUT: &str = include_str!("input");

struct Opcode<'a> {
    cmd: &'a str,
    operand: i32,
    exec_number: usize,
}

struct Cpu<'b> {
    rom: Vec<Opcode<'b>>,
    acc: i32,
    pc: usize,
}

impl Cpu<'_> {
    pub fn init(input: &'static str) -> Self {
        let mut rom = vec![];
        let opcodes = input.split('\n').collect::<Vec<&str>>();
        for opcode in opcodes {
            let command = opcode.split(' ').collect::<Vec<&str>>();
            rom.push(Opcode {
                cmd: command[0],
                operand: (command[1])[1..].parse::<i32>().unwrap(),
                exec_number: 0,
            })
        }

        return Cpu { rom, acc: 0, pc: 0 };
    }

    pub fn next(&mut self, next_pc: usize) {
        let mut opcode = self.rom.get_mut(self.pc).unwrap();
        opcode.exec_number += 1;
        self.pc += next_pc;
        if self.pc > (self.rom.len() - 1) {
            self.pc -= self.rom.len() - 1;
        }
    }

    pub fn run(&mut self) {
        loop {
            let opcode = self.rom.get(self.pc).unwrap();
            match opcode.cmd {
                "nop" => self.next(1),
                "acc" => {
                    self.acc += opcode.operand;
                    println!("{}", self.acc);
                    self.next(1);
                }
                "jmp" => self.next(opcode.operand as usize),
                _ => (),
            }
        }
    }
}

fn main() {
    let mut cpu = Cpu::init(INPUT);
    cpu.run();
}
