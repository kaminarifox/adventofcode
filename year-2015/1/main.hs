import System.IO

part1 = do
    input <- readFile "input.txt"
    let res = sum (map (\x -> if x == '(' then 1 else -1) input)
    print res

part2 = do
    input <- readFile "input.txt"
    let res = scanl1 (+) (map (\x -> if x == '(' then 1 else -1) input)
    print $ head $ filter (\x -> fst x == -1) $ zip res [1..length res]