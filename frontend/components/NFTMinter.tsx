"use client"
import { useState } from "react";
import { createImage } from "@/scripts/generateImage";
import { storeNFT } from "@/scripts/uploadImage";

export default function NFTMinter() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    // [data, img]
    let data = await createImage(desc);
    setImage(data[1]);

    console.log(data[0]);
  
    const result = await handleMint(data[0]);
    
  }

  const handleMint = async (imageBuffer: ArrayBuffer) => {
    const ipfsResponse = await storeNFT(imageBuffer, name, desc);
    const metadataUrl = ipfsResponse.ipnft + '.ipfs.dweb.link/metadata.json';
    console.log(metadataUrl);
    
    
  }

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == 'name') {
      setName(value);
    }
    if (name == 'desc') {
      setDesc(value);
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          <input type="text" name="name" placeholder="NFT Name..." onChange={handleChange}/>
        </label>
        <label>
          <input type="text" name="desc" placeholder="Description..." onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>

      <br />

      {/* Popup */}
      <img src={image} alt="Generated NFT" />
      <p>view <a href="/">metadata</a></p>
      <button onClick={handleMint}>Mint Nft</button>
      {/* Popup */}
    </div>
  );
}
