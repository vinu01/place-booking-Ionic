import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;

  constructor(private placeService: PlacesService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form=new FormGroup({
      title: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      dateTo: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      })

    });
  }

  onCreateOffer(){
    if(!this.form.valid){
      console.log("If form not valid!!");
      return;
    }
    this.loadingCtrl.create({
      message: 'Çreate Places.....'
    }).then(loadingEl =>{
      loadingEl.present();
      this.placeService.addPlace(
        this.form.value.title,
        this.form.value.description,
        +this.form.value.price,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo)
        )
        .subscribe(() =>{
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/offers']);
  
        });
    } );

    console.log(this.form);
    console.log('Creating Offer pages...');
  }

}
