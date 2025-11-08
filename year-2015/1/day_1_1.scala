
@main def main() =
    val source = scala.io.Source.fromFile("input.txt")

    var floor = source.map {
        case '(' => 1
        case ')' => -1
        case _   => 0
    }.sum

    println(floor)
