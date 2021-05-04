function capitalize(str) {
  if (str.charCodeAt(0) >= 'a'.charCodeAt(0) && str.charCodeAt(0) <= 'z'.charCodeAt(0)) {
    var cap = str.replace(str[0], String.fromCharCode(str.charCodeAt(0) - ('a'.charCodeAt(0) - 'A'.charCodeAt(0))))
    return cap
  } else {
    return str
  }
}

console.log(capitalize('hello'));