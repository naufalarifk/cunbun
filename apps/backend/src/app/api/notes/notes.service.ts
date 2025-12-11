import { Injectable } from '@nestjs/common';

@Injectable()
export class NoteService {
    users = [
        {
            name: "zamn",
            id: 1
        }
    ]
    getUsers() {
    return this.users
  }  
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  postUser({name, id}: {name: string, id: number}) {
    let usr = this.users
    usr = [{name: name, id: id}, ...this.users]
    return usr
  }

}
