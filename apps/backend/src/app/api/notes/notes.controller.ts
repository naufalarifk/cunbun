import { Controller, Get, Post } from '@nestjs/common';
import { NoteService } from './notes.service';

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getData() {
    return this.noteService.getData();
  }
  @Get("/users")
  getUsers(){
    return this.noteService.getUsers();
  }
  @Post("/user")
  createUser({name, id}: {name: string, id: number}) {
    return this.noteService.postUser({name, id});
  }


}
