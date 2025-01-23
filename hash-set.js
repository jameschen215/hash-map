import { NodeSet } from './node-set.js';

export class HashSet {
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

	hash(value) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < value.length; i++) {
			hashCode = (primeNumber * hashCode + value.charCodeAt(i)) % this.capacity;
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
				const newIndex = this.hash(current.value);

				if (newBuckets[newIndex] === null) {
					newBuckets[newIndex] = new NodeSet(current.value);
				} else {
					let temp = newBuckets[newIndex];

					while (temp.nextNode !== null) {
						temp = temp.nextNode;
					}

					temp.nextNode = new NodeSet(current.value);
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

	// Add element to the hash set.
	add(value) {
		// Check if needed to trigger resize
		if (this.length() > this.#capacity * this.#loaderFactor) {
			this.resize();
		}

		const index = this.hash(value);

		this.checkOutOfRange(index);

		if (this.#buckets[index] === null) {
			this.#buckets[index] = new NodeSet(value);
			return true;
		} else {
			let current = this.#buckets[index];

			while (current !== null) {
				if (current.value === value) {
					return false;
				}

				if (current.nextNode === null) {
					current.nextNode = new NodeSet(value);
					return true;
				}

				current = current.nextNode;
			}
		}
	}

	remove(value) {
		const index = this.hash(value);

		this.checkOutOfRange(index);

		let current = this.#buckets[index];
		let remove = null;
		let removeIndex = null;
		let counter = 0;

		while (current !== null) {
			if (current.value === value) {
				remove = current;
				removeIndex = counter;
			}

			counter += 1;
			current = current.nextNode;
		}

		console.log({ removeIndex, remove });

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

	contains(value) {
		const index = this.hash(value);
		let current = this.#buckets[index];

		while (current !== null) {
			if (current.value === value) {
				return true;
			}

			current = current.nextNode;
		}

		return false;
	}

	// Remove all entries in the hash map.
	clear() {
		for (let i = 0; i < this.#buckets.length; i++) {
			this.#buckets[i] = null;
		}
	}

	// Return the number of stored keys in the hash map.
	length() {
		let count = 0;

		for (let i = 0; i < this.#buckets.length; i++) {
			if (this.#buckets[i] !== null) {
				count += 1;
			}
		}

		return count;
	}

	print() {
		this.#buckets.forEach((bucket, index) =>
			console.log(`${index} - `, bucket)
		);
	}
}
