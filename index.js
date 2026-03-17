console.log("hello from Index.js" )

// Map function 
arr = [1,2,3,4,5]

arr.map((item) => {console.log(item)})

// Filter function
console.log(arr.filter(x => x%2 === 0))

// Reduce
console.log(arr.reduce((sum, x)=>sum+x, 0))

// ForEach
arr.forEach(element => {
  console.log(element)
});