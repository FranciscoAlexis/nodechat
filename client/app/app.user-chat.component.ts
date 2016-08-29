import { Component, Input , OnInit } from '@angular/core';
//import * as io from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';

import { User } from './app.user';
import { UserService } from './user.service';

@Component({
  selector: 'ct',
  template: `
    <div>
    <h2>{{receiverId}}</h2>
    <form (ngSubmit)="sendMessage()">
        <ul>
            <li *ngFor="let item of messages">
            {{item}}
            </li>
        </ul>
        <input [(ngModel)]="message"  autocomplete="off" [ngModelOptions]="{standalone: true}" required/>
        <button>Send</button>
    </form>
    </div>
  `
})
export class UserChatComponent implements OnInit{

    private receiverId: String;
    private sub:        any;
    private message:    String;
    private messages:   String[] = [];

    ngOnInit() {
        let self:UserChatComponent = this;
        UserService.socket.on('globalMessage',function(data){
            self.messages.push(data.message);
        });
    }

    public setReceiverId(id:String){
        this.receiverId = id;
    }

    sendMessage(){
        var message = { message : this.message, id : UserService.socket.id , token : UserService.token };
        UserService.socket.emit('globalMessage',message);
        this.message = '';
    }
}