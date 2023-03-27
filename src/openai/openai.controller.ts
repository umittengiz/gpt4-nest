import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiPromptDto } from './dto/openai-prompt.dto';
import { OpenaiGpt35PromptDto } from './dto/openai-gpt35-prompt.dto';
import { OpenaiGpt4PromptDto } from './dto/openai-gpt4-prompt.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('gpt3')
  generateResponse(@Body() openaiPromptDto: OpenaiPromptDto) {
    return this.openaiService.generateResponse(openaiPromptDto);
  }

  @Post('gpt35')
  generateGpt35(@Body() openaiGpt35PromptDto: OpenaiGpt35PromptDto) {
    return this.openaiService.generateGpt35(openaiGpt35PromptDto);
  }

  @Post('gpt4')
  generateGpt4(@Body() openaiGpt4PromptDto: OpenaiGpt4PromptDto) {
    return this.openaiService.generateGpt4(openaiGpt4PromptDto);
  }
}