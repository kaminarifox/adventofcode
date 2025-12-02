def part1() =
    val lines = scala.io.Source.fromFile("input.txt").getLines(); 
    val stepRegex = raw"(?<dir>[LR])(?<num>\d+)".r
    
    var dial = 50
    var cnt = 0

    for line <- lines do
        stepRegex.findFirstMatchIn(line) match
            case Some(m) => 
                if m.group("dir") == "L" then 
                    dial -= m.group("num").toInt
                else if m.group("dir") == "R" then 
                    dial += m.group("num").toInt
            case None => println("None :(")

        if dial.abs % 100 == 0 then
            cnt += 1

    println(s"Result: $cnt")


def part2() =
    val lines = scala.io.Source.fromFile("input.txt").getLines(); 
    val stepRegex = raw"(?<dir>[LR])(?<num>\d+)".r
    
    var dial = 50
    var cnt = 0

    for line <- lines do
        stepRegex.findFirstMatchIn(line) match
            case Some(m) => 
                if m.group("dir") == "L" then 
                    var i = m.group("num").toInt
                    while i > 0 do 
                        dial -= 1
                        if dial.abs % 100 == 0 then
                            cnt += 1
                        i -= 1
                else if m.group("dir") == "R" then 
                    var i = m.group("num").toInt
                    while i > 0 do 
                        dial += 1
                        if dial.abs % 100 == 0 then
                            cnt += 1
                        i -= 1
            case None => println("(╯°□°)╯︵ ┻━┻")

    println(s"Result: $cnt")

@main def main() =
    part1()
    part2()
