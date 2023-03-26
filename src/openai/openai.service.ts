import { Injectable } from '@nestjs/common';
import { OpenaiPromptDto } from './dto/openai-prompt.dto';
import { OpenaiGpt4PromptDto } from './dto/openai-gpt4-prompt.dto';
import axios from 'axios';
// import { OpenaiConfig } from '../../config/openai.config';

@Injectable()
export class OpenaiService {
  async generateResponse(openaiPromptDto: OpenaiPromptDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.apiKey}`,
    };

    const data = {
      prompt: openaiPromptDto.prompt,
      max_tokens: 256,
    };

    try {
      const response = await axios.post(process.env.apiUrl, data, { headers });
      const generatedResponse = response.data.choices[0].text;
      console.log("prompt: ", data.prompt, generatedResponse);
      // console.log(generatedResponse);
      return { response: generatedResponse };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw new Error('Failed to generate response from OpenAI API');
    }
  }

  async generateGpt4(openaiGpt4PromptDto: OpenaiGpt4PromptDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.apiKey}`,
    };

    const data = {
      messages: [{role: "user", content: openaiGpt4PromptDto.message}],
      max_tokens: 256,
      temperature: 0.7,
      model: 'gpt-4'
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });
      const generatedResponse = response.data.choices[0].message;
      console.log("prompt:", data.messages[0].content, "\n", generatedResponse.content);
      return { response: generatedResponse.content };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw new Error('Failed to generate response from OpenAI API');
    }
  }
}