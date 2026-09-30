import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from '../housing';
import { HousingLocationInfo } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  template: `
    @if (isLoading) {
      <p class="listing-loading">Loading…</p>
    } @else if (!housingLocation) {
      <section class="listing-not-found">
        <h2 class="listing-heading">No House found</h2>
      </section>
    } @else {
      <article>
        <img
          class="listing-photo"
          [src]="housingLocation.photo"
          alt="Exterior photo of {{ housingLocation.name }}"
          crossorigin
        />
        <section class="listing-description">
          <h2 class="listing-heading">{{ housingLocation.name }}</h2>
          <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
        </section>
        <section class="listing-features">
          <h2 class="section-heading">About this housing location</h2>
          <ul>
            <li>Units available: {{ housingLocation.availableUnits }}</li>
            <li>
              Does this location have wifi:
              @if (housingLocation?.wifi === true) {
                yes
              } @else if (housingLocation?.wifi === false) {
                no
              } @else {
                not defined
              }
            </li>
            <li>
              Does this location have laundry:
              @if (housingLocation?.laundry === true) {
                yes
              } @else if (housingLocation?.laundry === false) {
                no
              } @else {
                not defined
              }
            </li>
          </ul>
        </section>
        @if (housingLocation.availableUnits > 0) {
          <section class="listing-apply">
            <h2 class="section-heading">Apply now to live here</h2>
            <form [formGroup]="applyForm" (submit)="submitApplication()">
              <label for="first-name">First Name</label>
              <input id="first-name" type="text" formControlName="firstName" />

              <label for="last-name">Last Name</label>
              <input id="last-name" type="text" formControlName="lastName" />

              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" />
              <button type="submit" class="primary" [disabled]="applyForm.invalid">
                Apply now
              </button>
            </form>
          </section>
        }
      </article>
    }
  `,
  styleUrls: ['./details.css'],
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(Housing);
  housingLocation: HousingLocationInfo | undefined;
  isLoading = true;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);

    if (Number.isNaN(housingLocationId)) {
      this.isLoading = false;
      return;
    }

    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        // Leere Objekte ({}) ebenfalls als "nicht gefunden" behandeln
        this.housingLocation = housingLocation?.id !== undefined ? housingLocation : undefined;
      })
      .catch(() => {
        this.housingLocation = undefined;
      })
      .finally(() => {
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  submitApplication() {
    if (this.applyForm.invalid) {
      return;
    }
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
