import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiPromptDto } from './dto/openai-prompt.dto';
import { OpenaiGpt4PromptDto } from './dto/openai-gpt4-prompt.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('generate-response')
  generateResponse(@Body() openaiPromptDto: OpenaiPromptDto) {
    return this.openaiService.generateResponse(openaiPromptDto);
  }

  @Post('gpt4')
  generateGpt4(@Body() openaiGpt4PromptDto: OpenaiGpt4PromptDto) {
    return this.openaiService.generateGpt4(openaiGpt4PromptDto);
  }
}