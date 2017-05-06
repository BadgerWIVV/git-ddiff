#!/usr/bin/env node

/*
 * FUCKING UNLOGIC DATE SHIT
 */

const _MONTH_DAYS = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
const _git_date = function(date) {

	let str = '';
	str += date.getFullYear();
	str += '-' + (date.getMonth() + 1)
	str += '-' + date.getDate();
	str += ' ' + date.getHours();
	str += ':' + date.getMinutes();

	return str;

};
const _get_days = function(date) {

	let month = date.getMonth();
	if (_is_leap_year(date) === true && month === 1) {
		return 29;
	} else {
		return _MONTH_DAYS[month];
	}

};
const _is_leap_year = function(date) {

	let year = date.getFullYear();
	if (
		year % 4 === 0
		&& year % 100 !== 0
		&& year % 400 === 0
	) {
		return true;
	}


	return false;

};



/*
 * WORD TO NUMBER MAP
 */

const _NUMBERS = {
	0: [ 'zero' ],
	1: [ 'a', 'one' ],
	2: [ 'two' ],
	3: [ 'three' ],
	4: [ 'four' ],
	5: [ 'five' ],
	6: [ 'six' ],
	7: [ 'seven' ],
	8: [ 'eight' ],
	9: [ 'nine' ],
	10: [ 'ten' ],
	11: [ 'eleven' ],
	12: [ 'twelve' ],
	13: [ 'thirteen' ],
	14: [ 'fourteen' ],
	15: [ 'fifteen' ],
	16: [ 'sixteen' ],
	17: [ 'seventeen' ],
	18: [ 'eighteen' ],
	19: [ 'nineteen' ],
	20: [ 'twenty' ],
	21: [ 'twenty-one' ],
	22: [ 'twenty-two' ],
	23: [ 'twenty-three' ],
	24: [ 'twenty-four' ],
	25: [ 'twenty-five' ],
	26: [ 'twenty-six' ],
	27: [ 'twenty-seven' ],
	28: [ 'twenty-eight' ],
	29: [ 'twenty-nine' ],
	30: [ 'thirty' ]
};

const _NUMBERS_KEYS = Object.keys(_NUMBERS);
const _NUMBERS_VALS = Object.values(_NUMBERS);


let args = process.argv.slice(2);
let time = new Date();
let nao  = new Date();

// git ddiff yesterday
if (args.length === 1) {

	if (args[0] === 'yesterday') {

		let days = time.getDate();
		if (days === 1) {

			// XXX: New Year's Day
			let months = time.getMonth();
			if (months === 0) {

				time.setYear(time.getFullYear() - 1);
				time.setMonth(12);
				time.setDate(31);

			// XXX: 1st of each month
			} else {

				time.setMonth(months - 1);
				time.setDate(_get_days(time));

			}

		// XXX: 2nd - last of each month
		} else {

			time.setDate(days - 1);

		}

	}

// git ddiff yesterday morning
// git ddiff yesterday evening
} else if (args.length === 2) {

	if (args[0] === 'yesterday') {

		let days = time.getDate();
		if (days === 1) {

			// XXX: New Year's Day
			let months = time.getMonth();
			if (months === 0) {

				time.setYear(time.getFullYear() - 1);
				time.setMonth(12);
				time.setDate(31);

				// XXX: 1st of each month
			} else {

				time.setMonth(months - 1);
				time.setDate(_get_days(time));

			}

			// XXX: 2nd - last of each month
		} else {

			time.setDate(days - 1);

		}


		if (args[1] === 'morning') {
			time.setHours(8);
			time.setMinutes(00);
		} else if (args[1] === 'noon') {
			time.setHours(12);
			time.setMinutes(00);
		} else if (args[1] === 'evening') {
			time.setHours(18);
			time.setMinutes(00);
		} else if (args[1] === 'night') {
			time.setHours(22);
			time.setMinutes(00);
		} else if (args[1] === 'midnight') {
			time.setHours(23);
			time.setMinutes(59);
		}

	}

// git ddiff a week ago
// git ddiff two weeks ago
// git ddiff a day ago
// git ddiff two days ago
} else if (args.length === 3) {

	// two weeks <ago>
	if (args[2] === 'ago') {

		// <two> weeks ago
		let check = _NUMBERS_VALS.find(v => v.includes(args[0]));
		if (check !== undefined) {

			let index  = _NUMBERS_VALS.indexOf(check);
			let number = parseInt(_NUMBERS_KEYS[index], 10);
			if (!isNaN(number)) {

				// two <months> ago
				if (/^(month|months)$/g.test(args[1])) {

					let remaining = number;

					while (remaining > 0) {

						// XXX: Months in ES5 are zero indexed -_-
						let months = time.getMonth() + 1;
						if (months > remaining) {

							time.setMonth(months - remaining - 1);
							remaining = 0;

						} else {

							if (time.getMonth() === 0 || remaining === 12) {

								time.setYear(time.getFullYear() - 1);
								remaining -= 12;

							} else {

								time.setMonth(time.getMonth() - 1);
								remaining -= 1;

							}

						}

					}

					if (remaining < 0) {
						time.setMonth(time.getMonth() - remaining);
					}


				// two <weeks> ago
				} else if (/^(week|weeks)$/g.test(args[1])) {

					let remaining = number * 7;

					while (remaining > 0) {

						let days = time.getDate();
						if (days > remaining) {

							time.setDate(days - remaining);
							remaining = 0;

						} else {

							if (time.getMonth() === 0) {
								time.setYear(time.getFullYear() - 1);
								time.setMonth(12);
							} else {
								time.setMonth(time.getMonth() - 1);
							}

							remaining -= _get_days(time);

						}

					}


					if (remaining < 0) {
						time.setDate(time.getDate() - remaining);
					}


				// two <days> ago
				} else if (/^(day|days)$/g.test(args[1])) {

					let days = time.getDate();
					if (days > number) {
						time.setDate(days - number);
					} else {
						time.setMonth(time.getMonth() - 1);
						time.setDate(_get_days(time) - (number - days));
					}


				// two <hours> ago
				} else if (/^(hour|hours)$/g.test(args[1])) {

					let remaining = number;

					while (remaining > 0) {

						let hours = time.getHours();
						if (hours > remaining) {

							time.setHours(hours - remaining);
							remaining = 0;

						} else {

							time.setDate(time.getDate() - 1);
							time.setHours(24 - (number - hours));
							remaining = 0;

						}

					}

				}

			}

		}

	}

}



if (time < nao) {

	const _child_process = require('child_process');

	let log_process = _child_process.exec('git log --since="' + _git_date(time) + '"', {
		cwd: process.cwd(),
		env: process.env
	}, function(err, stdout, stderr) {

		if (err) {

			console.error(stderr.trim());
			process.exit(1);

		} else {

			let hashes = stdout.trim().split('\n').map(v => v.split(' ')[0].trim()).filter(v => v !== '');
			if (hashes.length > 0) {

				// XXX: Piping is fucked up in nodejs
				//
				// process.stdin.setRawMode(true);
				// process.stdin.pipe(diff)
				// diff.stdout.pipe(process)
				// will lead to endless loop, wtf.

				let diff = _child_process.exec('git diff ' + hashes[0], {
					cwd: process.cwd(),
					env: process.env,
					stdio: [
						process.stdin,
						'pipe',
						'pipe'
					]
				}, function(err, stdout, stderr) {

					if (err) {

						console.error(stderr.trim());
						process.exit(1);

					} else {

						console.log(stdout.trim());
						process.exit(0);

					}

				});

			} else {

				console.log('No changes since ' + time.toISOString());
				process.exit(0);

			}

		}

	});

}

