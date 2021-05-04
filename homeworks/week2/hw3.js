function reverse(str) {
  var rev = ''
  for (var i = str.length - 1; i >= 0; i--) {
    rev += str[i]
  }
  console.log(rev)
}

reverse('hello');