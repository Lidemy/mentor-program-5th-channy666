function solve(lines) {
  const arr = lines[0].split(' ')
  for (let i = Number(arr[0]); i <= Number(arr[1]); i++) {
    const str = i.toString()
    let sum = 0
    for (let j = 0; j < str.length; j++) {
      sum += Number(str[j]) ** str.length
    }
    if (sum === i) {
      console.log(i)
    }
  }
}
solve(['5 200'])
