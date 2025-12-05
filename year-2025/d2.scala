import scala.compiletime.ops.boolean

def getRangeInvalids(range: List[Long]) =
    def isInvalid(num: String)
        = num.length > 1 && num.length % 2 == 0 && num.take(num.length / 2) == num.drop(num.length / 2)
    (range.head to range.last).toList.filter(x => isInvalid(x.toString))


def getRangeInvalids2(range: List[Long]) =
    def isInvalid(num: String) =
        (1 to (num.length / 2).toInt)
        .exists { x =>
            val part = num.take(x)
            s"($part){2,}".r.matches(num)
        }

    (range.head to range.last).toList.filter(x => isInvalid(x.toString))


def part1() =
    scala.io.Source.fromFile("input.txt").getLines().next().split(",").toList
        .map(_.split("-").toList.map(_.toLong))
        .map(getRangeInvalids).flatten.sum

def part2() =
    scala.io.Source.fromFile("input.txt").getLines().next().split(",").toList
        .map(_.split("-").toList.map(_.toLong))
        .map(getRangeInvalids2).flatten.sum

@main def main() =
    println(part1())
    println(part2())