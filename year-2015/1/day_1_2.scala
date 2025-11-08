
@main def main() =
    val source = scala.io.Source.fromFile("input.txt")
    var floor = 0

    var res = 1 + source.takeWhile { el =>
        floor += (el match
            case '(' => 1
            case ')' => -1
            case _   => 0
        )
        floor != -1
    }.size

    println(res)
