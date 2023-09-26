export const stringToColour = (str: string) => {
  let hash = 0
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = "#"
  if (str.slice(2, 5) === "000") {
    colour = "#333"
  } else {
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, "0")
    }
  }
  return colour as string
}
