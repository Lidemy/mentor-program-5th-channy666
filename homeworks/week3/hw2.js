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

/*
數學解法

function solve(lines) {
  let arr = lines[0].split(' ')
  for (let i = Number(arr[0]); i <= Number(arr[1]); i++) {
   isNarcissisticNumber(i, digitsCount(i))
  }
}

function digitsCount (n) {
  let result = 0
  while (n != 0) {
    n = Math.floor(n / 10)
    result++
  }
  return result
}

function isNarcissisticNumber (num, digits) {
  let n = num
  let sum = 0
  while (n != 0) {
    sum += (n % 10) ** digits
    n = Math.floor(n / 10)
  }
  if (sum === num) {
    console.log(num)
  }
}
*/
