import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
import path from 'path'

export async function storeNFT(imageBuffer: ArrayBuffer, name: string, description: string) {
  // Create a Blob object from the ArrayBuffer or Buffer
  const blob = new Blob([imageBuffer]);

  // Create a File object from the Blob
  const image = new File([blob], name+'.png', { type: 'image/png' });

  console.log(image); // This will display the created File object in the console

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image,
    name,
    description,
  })
}