const decoder = {a: 0, b: 32, c: 64, d: 96, e: 128, f: 160}

function decode(letters) {
  const x = letters.charAt(0), y = letters.charAt(1)

  return {x: decoder[x], y: decoder[y]}
}

// a rect is {x, y, w, h}
function collides(rect1, rect2) {
  return rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
}
