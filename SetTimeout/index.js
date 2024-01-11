/**
 * 処理を同期的に3秒スリープする
 */

const _sleep = (ms) => new Promise((resolve) => setTimeout(() => console.log('PROCESSING...'), ms));

const sleep = async () => setTimeout(() => console.log('PROCESSING...'), 3000);

// x
const sample = async () => {
	console.log('------sample1------')
	console.log(11111)
	await sleep()
	console.log(22222)
}

// x (コールバック型の非同期関数は戻り値がなかったり、Promiseオブジェクトも返さないのでawaitはできない)
const sample2 = async () => {
	console.log('------sample2------')
	console.log(11111)
	await setTimeout(() => console.log('PROCESSING...'), 3000);
	console.log(22222)
}

// x (22222)
const sample3 = async () => {
	console.log('------sample3------')
	console.log(11111)
	await _sleep(3000).then((res) => console.log('PROCESSING...', res))
	console.log(22222)
}

// x (22222)
const sample4 = async () => {
	console.log('------sample4------')
	console.log(11111)
	await _sleep(3000)
	console.log(22222)
}

// x
const sample5 = async () => {
	console.log('------sample5------')
	console.log(11111)
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
			console.log('PROCESSING...')
		}, 3000)
	})
	console.log(promise)
	console.log(22222)
}

// o
const sample6 = async () => {
	console.log('------sample6------')
	console.log(11111)
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, 3000)
	}).then(() => {
		console.log('5秒経過')
	})
	await promise
	console.log(22222)
}

// o
const sample7 = async () => {
	console.log('------sample7------')
	console.log(11111)
	await new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('5秒経過')
		}, 3000)
	}).then((res) => {
		console.log(res)
	})
	console.log(22222)
}

// o
// resolveあり
const sample8 = async () => {
	console.log('------sample8------')
	console.log(11111)
	// Promiseでラップする
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('hello');
		}, 3000)
	})
	const message = await promise;
	console.log('message', message)
	console.log(22222)
}

// x (hello)
// resolveなし
const sample9 = async () => {
	console.log('------sample9------')
	console.log(11111)
	// Promiseでラップする
	const promise = new Promise(() => {
		setTimeout(() => {
			console.log('hello')
		}, 3000)
	})
	const message = await promise.then(res => {
		console.log(res)
		console.log(22222)
	})
	console.log('message', message)
}

// sample()
// sample2()
// sample3()
// sample4()
// sample5()
// sample6()
// sample7()
// sample8()
sample9()
