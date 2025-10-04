import { stations, travelTimes } from '../data/travelData.js';

export function getAvailableDirections(departure) {
    const available = [];
    if (departure !== '千葉') available.push('千葉方面');
    if (departure !== '錦糸町') available.push('錦糸町方面');
    return available;
}

export function getDisplayStations(departure, direction) {
    const departureIndex = stations.indexOf(departure);

    if (direction === '千葉方面') {
        return stations.slice(departureIndex);
    } else {
        return stations.slice(0, departureIndex + 1).reverse();
    }
}

export function calculateArrivalTimes(trainType, startTime, displayStations, departure, direction) {
    if (!startTime) return {};

    const [hours, minutes] = startTime.split(':').map(Number);
    const startTotalMinutes = hours * 60 + minutes;
    const times = {};

    for (const station of displayStations) {
        if (station === departure) continue;

        const fromTime = travelTimes[direction][trainType][departure];
        const toTime = travelTimes[direction][trainType][station];
        const travelTime = Math.abs(toTime - fromTime);

        const arrivalTime = startTotalMinutes + travelTime;
        const arrivalHours = Math.floor(arrivalTime / 60) % 24;
        const arrivalMinutes = arrivalTime % 60;

        times[station] = `${String(arrivalHours).padStart(2, '0')}:${String(arrivalMinutes).padStart(2, '0')}`;
    }

    return times;
}

export function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}