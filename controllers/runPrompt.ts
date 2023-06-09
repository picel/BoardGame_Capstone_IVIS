import { Configuration, OpenAIApi } from "openai";

export default async function (prompt: string) : Promise<any> {
    const gptConfig = new Configuration({
        organization: process.env.OPENAI_ORGANIZATION,
        apiKey: process.env.OPENAI_SECRET_KEY,
    });
    const openai = new OpenAIApi(gptConfig);
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.2,
    });

    return response.data.choices[0].text;
}