import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  gameForm: FormGroup;
  game_name = '';
  team = '';
  req_player_num = 0;
  curr_enrolled_player_num = 0;
  organizer = '';
  game_loc = '';
  game_date = Date.now();
  game_time = '';
  game_duration = '';
  contact_org = '';
  org_email_id = '';
  updated_date = Date.now();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      'game_name' : [null, Validators.required],
      'team' : [null, Validators.required],
      'organizer' : [null, Validators.required],
      'game_loc' : [null, Validators.required],
      'game_date' : [null, Validators.required],
      'game_time' : [null, Validators.required],
      'game_duration' : [null, Validators.required],
      'contact_org' : [null, Validators.required],
      'req_player_num' : [null, Validators.required],
      'org_email_id' : this.authService.user.email
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postGame(form)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/game-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
