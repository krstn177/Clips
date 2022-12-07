import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip : IClip | null = null;
  @Output() update = new EventEmitter();

  showAlert = false;
  alertMsg = 'Please wait! Updating clip.';
  alertColor = 'blue';
  inSubmission = false;
  
  editForm = new FormGroup({
    id: new FormControl('', {
      nonNullable: true
    }),
    title: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(3)
      ],
      nonNullable: true
    })
  })

  constructor( private modal: ModalService, private clipService: ClipService) { }


  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy() {
    this.modal.unregister('editClip');
  }

  ngOnChanges(){
    if (!this.activeClip) {
      return
    }


    this.inSubmission = false;
    this.showAlert = false;
    this.editForm.controls.id.setValue(this.activeClip.docID as string);
    this.editForm.controls.title.setValue(this.activeClip.title)
  }

  async submit(){
    if (!this.activeClip) {
      return
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';

    try{
      await this.clipService.updateClip(
        this.editForm.controls.id.value,
        this.editForm.controls.title.value
      )
    }catch(err){
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later'
      return
    }

    this.activeClip.title = this.editForm.controls.title.value;
    this.update.emit(this.activeClip)

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success';
  }

}
