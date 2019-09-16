const decoder = {a: 0, b: 32, c: 64, d: 96, e: 128, f: 160}

function decode(letters) {
  const x = letters.charAt(0), y = letters.charAt(1)

  return {x: decoder[x], y: decoder[y]}
}
