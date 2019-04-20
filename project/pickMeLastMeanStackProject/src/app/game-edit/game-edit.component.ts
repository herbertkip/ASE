import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  gameForm: FormGroup;
  id:string = '';
  game_name: String = '';
  team: String = '';
  organizer: String = '';
  game_loc: String = '';
  game_date: String = '';
  game_time: String = '';
  game_duration: String = '';
  contact_org: String = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.gameForm = this.formBuilder.group({
      'game_name' : [null, Validators.required],
      'team' : [null, Validators.required],
      'organizer' : [null, Validators.required],
      'game_loc' : [null, Validators.required],
      'game_date' : [null, Validators.required],
      'game_time' : [null, Validators.required],
      'game_duration' : [null, Validators.required],
      'contact_org' : [null, Validators.required]
    });
  }

  getBook(id) {
    this.api.getGame(id).subscribe(data => {
      this.id = data._id;
      this.gameForm.setValue({
        game_name: data.game_name,
        team: data.team,
        organizer: data.organizer,
        game_loc: data.game_loc,
        game_date: data.game_date,
        game_time: data.game_time,
        game_duration: data.game_duration,
        contact_org: data.contact_org
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateGame(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/game-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  bookDetails() {
    this.router.navigate(['/game-details', this.id]);
  }
}
