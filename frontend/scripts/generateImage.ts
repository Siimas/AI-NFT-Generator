import axios from 'axios';

export const createImage = async (prompt: string) => {
  console.log("Generating Image...");

  // Send the request
  const response = await axios({
    url: `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUGGINFACE_API_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      inputs: prompt, options: { wait_for_model: true },
    }),
    responseType: 'arraybuffer',
  })

  const type = response.headers['content-type']
  const data = response.data

  let Buffer = require('buffer').Buffer;

  const base64data = Buffer.from(data).toString('base64')
  const img = `data:${type};base64,` + base64data // <-- This is so we can render it on the page

  return [data, img]
}