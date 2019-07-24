// 现在有两个数组 arr1  和  arr2

let arr1 = [1,2,3,4,4]
let arr2 = [3,4,5,6,7]


// 1.数组的并集： 属于A或者又属于B
let union = new Set([...arr1,...arr2])

// 2.数组的交集: 既属于A又属于B
let intersect  = new Set([...arr1].filter(item => arr2.includes(item)))

// 3. 数组的差集  属于A不属于B
let difference = new Set([...arr1].filter(item => !arr2.includes(item)))
