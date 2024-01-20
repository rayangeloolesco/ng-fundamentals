import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../../../common/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  private firstName: FormControl = new FormControl();
  private lastName: FormControl = new FormControl();

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  ngOnInit(): void {
    this.firstName = new FormControl(
      this.authService.currentUser?.firstName,
      Validators.required
    );
    this.lastName = new FormControl(this.authService.currentUser?.lastName, [
      Validators.required,
      Validators.pattern('[a-zA-z].*'),
    ]);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  saveProfile(formValues: any) {
    if (this.profileForm.valid) {
      this.authService
        .updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.toastr.success('Profile Saved');
        });
    }
  }

  cancel() {
    this.router.navigate(['events']);
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }
}
