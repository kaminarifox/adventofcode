data = File.read('41.txt')
 
data = data.lines

result = 0

for i in 0..data.length - 1
    arr = data[i].split(' ')
    
    arr.map! { |item| item.chars.sort.join }
    
    
    z = arr.detect{ |e| arr.count(e) > 1}
    
    if (z == nil)
        result += 1
    end
end

puts result 
