import { HfInference } from '@huggingface/inference';

export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

  if (!HUGGINGFACE_API_KEY) {
    return res.status(500).json({ error: 'HUGGINGFACE_API_KEY is not set in environment variables.' });
  }

  try {
    // 공식 SDK 인스턴스 생성
    const hf = new HfInference(HUGGINGFACE_API_KEY);

    // 안정적인 SDXL 모델 사용
    const imageBlob = await hf.textToImage({
      model: 'runwayml/stable-diffusion-v1-5',
      inputs: prompt,
      parameters: { num_inference_steps: 25 }
    });

    // Blob 데이터를 Buffer로 변환하여 클라이언트로 전송
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'image/png');
    return res.status(200).send(buffer);

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}