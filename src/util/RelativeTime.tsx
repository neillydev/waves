export default function getHumanTime (timestamp: number) {
    var now = new Date().getTime();

    timestamp = timestamp - now;

	var time: number = Math.abs(timestamp);
	var humanTime: number;
    var units: string;

	// If there are years
	if (time > (1000 * 60 * 60 * 24 * 365)) {
		humanTime = time / (1000 * 60 * 60 * 24 * 365);
		units = 'years';
	}

	// If there are months
	else if (time > (1000 * 60 * 60 * 24 * 30)) {
		humanTime = time / (1000 * 60 * 60 * 24 * 30);
		units = 'months';
	}

	// If there are weeks
	else if (time > (1000 * 60 * 60 * 24 * 7)) {
		humanTime = time / (1000 * 60 * 60 * 24 * 7);
		units = 'weeks';
	}

	// If there are days
	else if (time > (1000 * 60 * 60 * 24)) {
		humanTime = time / (1000 * 60 * 60 * 24);
		units = 'days';
	}

	// If there are hours
	else if (time > (1000 * 60 * 60)) {
		humanTime = time / (1000 * 60 * 60);
		units = 'hours';
	}

	// If there are minutes
	else if (time > (1000 * 60)) {
		humanTime = time / (1000 * 60);
		units = 'minutes';
	}

	// Otherwise, use seconds
	else {
		humanTime = time / (1000);
		units = 'seconds';
	}
    humanTime = parseInt(humanTime.toString(), 10);
    
	return Math.floor(humanTime) + ' ' + units + ' ago';

};