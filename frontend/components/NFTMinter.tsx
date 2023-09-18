"use client"
import { useState } from "react";
import { createImage } from "@/scripts/generateImage";

export default function NFTMinter() {
  const [image, setImage] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    console.log('aqui');
    Buffer.from([0,1,2,3]);

    const name = e.target.name.value;
    const desc = e.target.desc.value;

    console.log(`${name} & ${desc}`);

    let data = await createImage(desc);
    setImage(data[1]);
    console.log(data[0]);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          <input type="text" name="name" placeholder="NFT Name..." />
        </label>
        <label>
          <input type="text" name="desc" placeholder="Description..." />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <br />

      {/* Popup */}
      <img src={image} alt="Generated NFT" />
      <p>view <a href="/">metadata</a></p>
      <button>Mint Nft</button>
      {/* Popup */}
    </div>
  );
}
