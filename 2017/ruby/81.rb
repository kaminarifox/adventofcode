data = File.read('data.txt')
data = data.lines

max = Hash.new
maxVal = 0
data.each do |e| 
    max[e.split[0]] = 0
end

data.each do |e|
    e = e.split
    nextOp = max[e[4]].public_send(e[5], e[6].to_i) # invoke method 
    
    if !nextOp
        next
    end 
    
    if e[1] == 'inc'
        max[e[0]] += e[2].to_i
    else
        max[e[0]] -= e[2].to_i
    end
    
    if max[e[0]] > maxVal
        maxVal = max[e[0]]
    end
end

# result for first part
# puts max.max_by{|k,v| v}  

puts maxVal


