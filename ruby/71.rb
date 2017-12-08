data = File.read('data.txt').lines
names = Hash.new

data.each do |item|
    name = item.split.first
    weight = item.split[1][1..-2].to_i
    children = item.partition(" -> ").last.empty? ? nil : item.partition(" -> ").last.split(", ").map {|e| e.strip}
    
    names[name] = {
        "weight"    => weight,
        "children"  => children
    }
end

puts names.length

names.keys.each do |key|
    children = Hash.new
    
    if names[key] == nil
        next
    end
    
    if names[key]["children"]
        names[key]["children"].each do |c|
            children[c] = names[c]
            names.delete(c)
        end
    end
    
    names[key]["children"] = children
end

puts names.length



