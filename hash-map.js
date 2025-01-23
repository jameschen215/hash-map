import { Node } from './node.js';

export class HashMap {
	#loaderFactor;
	#capacity;
	#buckets;

	constructor(capacity = 16, loaderFactor = 0.75) {
		this.#capacity = capacity;
		this.#loaderFactor = loaderFactor;
		this.#buckets = new Array(this.#capacity).fill(null);
	}

	get capacity() {
		return this.#capacity;
	}

	set capacity(newValue) {
		this.#capacity = newValue;
	}

	checkOutOfRange(index) {
		if (index < 0 || index >= this.#buckets.length) {
			throw new Error('Trying to access index out of bounds');
		}
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	resize() {
		// Update the capacity
		this.#capacity *= 2;

		const oldBuckets = this.#buckets.slice();
		const newBuckets = new Array(this.#capacity).fill(null);

		// Rehash and reinsert all elements from oldBuckets into newBuckets
		for (let i = 0; i < oldBuckets.length; i++) {
			let current = oldBuckets[i];

			while (current !== null) {
				const newIndex = this.hash(current.key);

				if (newBuckets[newIndex] === null) {
					newBuckets[newIndex] = new Node(current.key, current.value);
				} else {
					let temp = newBuckets[newIndex];

					while (temp.nextNode !== null) {
						temp = temp.nextNode;
					}
					temp.nextNode = new Node(current.key, current.value);
				}

				current = current.nextNode;
			}
		}

		// Update the buckets
		this.#buckets = newBuckets;
	}

	// Return the number of stored keys in the hash map.
	length() {
		let count = 0;

		for (let i = 0; i < this.#buckets.length; i++) {
			if (this.#buckets[i] !== null) {
				let temp = this.#buckets[i];

				while (temp !== null) {
					count += 1;
					temp = temp.nextNode;
				}
			}
		}

		return count;
	}

	set(key, value) {
		// Check if needed to trigger resize
		if (this.length() > this.#capacity * this.#loaderFactor) {
			this.resize();
		}

		const index = this.hash(key);

		this.checkOutOfRange(index);

		if (this.#buckets[index] === null) {
			this.#buckets[index] = new Node(key, value);
		} else {
			let current = this.#buckets[index];

			while (current !== null) {
				// If key exists, update the value
				if (current.key === key) {
					current.value = value;
					return true;
				}

				// if end of the list, add the new node
				if (current.nextNode === null) {
					current.nextNode = new Node(key, value);
					return true;
				}

				current = current.nextNode;
			}
		}

		return false;
	}

	get(key) {
		const index = this.hash(key);
		let current = this.#buckets[index];

		while (current !== null) {
			if (current.key === key) {
				return current.value;
			}
			current = current.nextNode;
		}

		return null;
	}

	// Take a key as an argument and returns true or false based on
	// whether or not the key is in the hash map.
	has(key) {
		const index = this.hash(key);
		let current = this.#buckets[index];

		while (current !== null) {
			if (current.key === key) {
				return true;
			}

			current = current.nextNode;
		}

		return false;
	}

	/**
	 * Take a key as an argument. If the given key is in the hash map,
	 * it should remove the entry with that key and return true. If the
	 * key isn’t in the hash map, it should return false.
	 */
	remove(key) {
		const index = this.hash(key);
		let current = this.#buckets[index];

		if (current === null) return false;

		let remove = null;
		let removeIndex = null;
		let counter = 0;

		while (current !== null) {
			if (current.key === key) {
				remove = current;
				removeIndex = counter;
			}

			counter += 1;
			current = current.nextNode;
		}

		if (remove !== null) {
			if (removeIndex === 0) {
				this.#buckets[index] =
					remove.nextNode !== null ? remove.nextNode : null;
				return true;
			} else {
				let count = 0;
				let temp = this.#buckets[index];
				while (temp !== null) {
					if (count === removeIndex - 1) {
						temp.nextNode = temp.nextNode.nextNode;
						return true;
					}
					temp = temp.nextNode;
					count += 1;
				}
			}
		}

		return false;
	}

	// Remove all entries in the hash map.
	clear() {
		for (let i = 0; i < this.#buckets.length; i++) {
			this.#buckets[i] = null;
		}
	}

	// Return an array containing all the keys inside the hash map.
	keys() {
		const keys = [];

		for (let i = 0; i < this.#buckets.length; i++) {
			if (this.#buckets[i] !== null) {
				let current = this.#buckets[i];

				while (current !== null) {
					keys.push(current.key);
					current = current.nextNode;
				}
			}
		}

		return keys;
	}

	// Return an array containing all the values.
	values() {
		const values = [];

		for (let i = 0; i < this.#buckets.length; i++) {
			if (this.#buckets[i] !== null) {
				let current = this.#buckets[i];

				while (current !== null) {
					values.push(current.value);
					current = current.nextNode;
				}
			}
		}

		return values;
	}

	// Return an array that contains each key, value pair.
	// Example: [[firstKey, firstValue], [secondKey, secondValue]]
	entries() {
		const entries = [];

		for (let i = 0; i < this.#buckets.length; i++) {
			if (this.#buckets[i] !== null) {
				let current = this.#buckets[i];

				while (current !== null) {
					entries.push([current.key, current.value]);
					current = current.nextNode;
				}
			}
		}

		return entries;
	}

	print() {
		this.#buckets.forEach((bucket, index) =>
			console.log(`${index} - `, bucket)
		);
	}
}
