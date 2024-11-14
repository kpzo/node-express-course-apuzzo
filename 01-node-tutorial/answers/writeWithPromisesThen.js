const { writeFile, readFile } = require("fs").promises; 

writeFile('temp.txt', 'four\n')
.then(() => {  
   return writeFile('temp.txt', 'five\n', { flag: 'a' })
})  
.then(() => {
    return writeFile('temp.txt', 'six\n', { flag: 'a' })
})
.then (()=> {
    return readFile('temp.txt', 'utf8')
}) 
.then ((data) => {
    console.log(data)
})
.catch((error) => {  
    console.log("An error occurred: ", error)  
})
