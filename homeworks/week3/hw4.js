function solve(lines) {
  const str = lines[0]
  let Palindrome = ''
  for (let i = str.length - 1; i >= 0; i--) {
    Palindrome += str[i]
  }
  if (str === Palindrome) {
    console.log('True')
    return
  }
  console.log('False')
}
solve(['abba'])
