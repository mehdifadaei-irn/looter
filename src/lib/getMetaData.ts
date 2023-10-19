export async function getMetaData(contractAddress: `0x${string}` | undefined) {
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2.2/nft/${contractAddress}/0?chain=polygon&format=decimal&normalizeMetadata=true&media_items=false`,
    {
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
      },
    },
  )
  console.log("first")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

