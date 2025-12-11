import { Module } from '@nestjs/common';
import { NoteController } from './notes.controller';
import { NoteService } from './notes.service';

@Module({
  imports: [],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
