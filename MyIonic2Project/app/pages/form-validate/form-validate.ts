import {Component} from '@angular/core';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/form-validate/form-validate.html'
})
export class FormValidationPage {
  uname;
  email;
  isValidName = true;
  isValidEmail = true;

  constructor(public modalCtr: ModalController) {
  	this.uname = '';
  	this.email = '';
  }

  openModal() {
  	let modal = this.modalCtr.create(ModalContentsPage, {name : this.uname, email: this.email, scope: this}, {showBackdrop: true});
  	modal.present();
  	modal.onDidDismiss(data => {
  		data.scope.isValidEmail = data.isValidEmail;
  		data.scope.isValidName = data.isValidName;  		
  	})
  }
}


@Component({
	templateUrl: 'build/pages/form-validate/modal-content.html'
})

class ModalContentsPage {
	uname;
	email;
	parentScope;

	constructor(public platform: Platform, public params: NavParams, public viewCtlr: ViewController) {
		this.uname = this.params.get('name');
		this.email = this.params.get('email');
		this.parentScope = this.params.get('scope');
	}

	dismiss() {
		let validName = true;
		let validEmail = true;
		let emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
		if(!this.uname.trim().length) {
			validName = false;
		}
		if(!this.email.trim().length || (!emailRegex.test(this.email))) {
			validEmail = false;
		}
		this.viewCtlr.dismiss({isValidName: validName, isValidEmail: validEmail, scope: this.parentScope});
	}
}