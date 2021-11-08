import { fromEvent, Subject } from 'rxjs';
import { scan, filter } from 'rxjs/operators';

const CountSubject = new Subject();

const counterButton = document.getElementById('counter-button');

fromEvent(counterButton, 'click')
  .pipe(
    scan((count) => count + 1, 0),
    filter((count) => {
      if (count % 4 === 0) {
        console.log('no multiples of 4 allowed!');
        return false;
      }

      return true;
    })
  )
  .subscribe((count) => CountSubject.next(count));

const counterSpan = document.getElementById('counter-span');

CountSubject.subscribe((count) => {
  counterSpan.innerText = count;
});

CountSubject.subscribe((count) => {
  console.log(`You have clicked ${count} times!`);
});

CountSubject.subscribe((count) => {
  if (count % 5 === 0) {
    window.alert('You have clicked a multiple of 5 times!!!');
  }
});
