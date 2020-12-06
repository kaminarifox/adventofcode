data = File.read('data.txt')
data = data.split("\t")
data.map! { |item| item.to_i }

arr = [data.join]
steps = 0

while true 
    max = data.max
    maxI = data.index(max)
    
    data[maxI] = 0
    
    while max != 0
        maxI += 1
        if maxI > data.length - 1
            maxI = 0
        end
        
        data[maxI] += 1
        max -= 1
    end
    
    steps += 1
    
    if arr.index(data.join) != nil
        puts steps
        break
    else
        arr.push(data.join)
    end
end
    
