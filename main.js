import { HashMap } from './hash-map.js';
import { HashSet } from './hash-set.js';

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('air conditioner', 'white');
test.set('moon', 'silver');
test.set('sun', 'gold');
test.set('desk', 'dark gray');
test.set('lover', 'pink');
test.set('sky', 'blue');

console.log(test.length());
console.log(test.remove('sky'));
