import { HashMap } from './hash-map.js';
import { HashSet } from './hash-set.js';

const test = new HashMap();

// test.set('apple', 'red');
// test.set('banana', 'yellow');
// test.set('carrot', 'orange');
// test.set('dog', 'brown');
// test.set('elephant', 'gray');
// test.set('frog', 'green');
// test.set('grape', 'purple');
// test.set('hat', 'black');
// test.set('ice cream', 'white');
// test.set('jacket', 'blue');
// test.set('kite', 'pink');
// test.set('lion', 'golden');
// test.set('air conditioner', 'white');
// test.set('moon', 'silver');
// test.set('sun', 'gold');
// test.set('desk', 'dark gray');
// test.set('lover', 'pink');
// test.set('sky', 'blue');
// test.print();

const testSet = new HashSet();

testSet.add('apple');
testSet.add('banana');
testSet.add('carrot');
testSet.add('dog');
testSet.add('elephant');
testSet.add('frog');
testSet.add('grape');
testSet.add('hat');
testSet.add('ice cream');
testSet.add('jacket');
testSet.add('kite');
testSet.add('lion');
testSet.add('moon');
testSet.add('sun');
testSet.add('desk');
testSet.add('lover');
testSet.add('sky');
testSet.add('sky');
testSet.add('air conditioner');
testSet.add('james');

testSet.print();

console.log(testSet.capacity);
console.log(testSet.length());
// testSet.remove('kite');
