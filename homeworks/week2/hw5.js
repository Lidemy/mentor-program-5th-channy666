function join(arr, concatStr) {
  var str = ''
  for (var i = 0; i < arr.length - 1; i++) {
    str += arr[i] + concatStr
  }
  str += arr[arr.length - 1]
  return str
}

function repeat(str, times) {
  var rep = ''
  for (var i = 1; i <= times; i++) {
    rep += str
  }
  return rep
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));