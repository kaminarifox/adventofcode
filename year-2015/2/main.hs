import System.IO
import Data.List
import Data.List.Split

part1 = do
    input <- readFile "input.txt"
    let inputParsed = parse input
    let res = sum $ map surface inputParsed
    print res

part2 = do
    input <- readFile "input.txt"
    let inputParsed = parse input
    let res = sum $ map ribbon inputParsed
    print res

parse input = map (map (\x -> read x :: Integer)) $ map (splitOneOf "x") $ lines input
surface [l,w,h] = 2 * (sum [l*w,w*h,h*l]) + (minimum [l*w,w*h,h*l])
ribbon [l,w,h] = product [l,w,h] + 2 * (sum $ take 2 $ sort [l,w,h])