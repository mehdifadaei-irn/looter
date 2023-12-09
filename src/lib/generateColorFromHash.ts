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

export function convertToRandomHexColor(str: string) {
  // Check if the string is long enough
  if (str.length < 6) {
    throw new Error("String is too short to extract a valid hex color.")
  }

  // Remove the '0x' prefix if present
  let cleanStr = str.startsWith("0x") ? str.slice(2) : str

  // Generate a random starting index
  let startIndex = Math.floor(Math.random() * (cleanStr.length - 6))

  // Extract 6 characters from the string starting at the random index
  let hexColor = cleanStr.substring(startIndex, startIndex + 6)

  // Ensure the extracted string is a valid hex color
  if (!/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
    throw new Error("Extracted string is not a valid hex color.")
  }

  return `#${hexColor}`
}
