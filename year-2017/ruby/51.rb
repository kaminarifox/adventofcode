data = File.read('data.txt')
data = data.lines

data.map! { |item| item.to_i }

i = 0
steps = 0

while true
    pointer = i
    i += data[i]
    
    if (data[pointer] >= 3)
        data[pointer] -= 1
    else
        data[pointer] += 1  
    end
    
    steps += 1
    
    if (i >= data.length || i < 0)
        puts steps
        break
    end
end
