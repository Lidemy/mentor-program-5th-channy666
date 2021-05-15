function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    console.log(isPrimeNumber(Number(lines[i])))
  }
}
function isPrimeNumber(n) {
  if (n === 1) {
    return 'Composite'
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return 'Composite'
    }
  }
  return 'Prime'
}
solve([5, 1, 2, 3, 4, 5])
