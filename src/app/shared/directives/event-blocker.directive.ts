import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {

  @HostListener('drop', ['$event'])
  public handleEvent(event: Event) {
    event.preventDefault();
  }

}
