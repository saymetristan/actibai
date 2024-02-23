import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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',
  });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-4-0125-preview",
  });

  console.log(completion.choices[0]);
}

main();