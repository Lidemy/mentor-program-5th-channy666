function solve(lines) {
  for (let i = 1; i <= Number(lines[0]); i++) {
    const arr = lines[i].split(' ')
    console.log(whoWins(arr[0], arr[1], Number(arr[2])))
  }
}

function whoWins(a, b, c) {
  const A = a.toString()
  const B = b.toString()
  if (A.length > B.length) {
    if (c === 1) {
      return 'A'
    }
    return 'B'
  } else if (A.length < B.length) {
    if (c === 1) {
      return 'B'
    }
    return 'A'
  } else {
    for (let i = 0; i < A.length; i++) {
      if (A[i] > B[i]) {
        if (c === 1) {
          return 'A'
        }
        return 'B'
      } else if (A[i] < B[i]) {
        if (c === 1) {
          return 'B'
        }
        return 'A'
      }
    }
    return 'DRAW'
  }
}
solve(['3', '1 2 1', '1 2 -1', '2 2 1'])
