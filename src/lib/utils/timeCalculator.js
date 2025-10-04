import { stations, travelTimes } from '../data/travelData.js';

/**
 * 選択可能な方向を取得
 */
export function getAvailableDirections(departure) {
    const available = [];
    if (departure !== '千葉') {
        available.push('千葉方面');
    }
    if (departure !== '錦糸町') {
        available.push('錦糸町方面');
    }
    return available;
}

/**
 * 表示する駅リストを取得
 */
export function getDisplayStations(departure, direction) {
    const departureIndex = stations.indexOf(departure);
    const result = [];

    if (direction === '千葉方面') {
        for (let i = departureIndex; i < stations.length; i++) {
            result.push(stations[i]);
        }
    } else {
        for (let i = departureIndex; i >= 0; i--) {
            result.push(stations[i]);
        }
    }

    return result;
}

/**
 * 到着時刻を計算
 */
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

        times[station] = `${padZero(arrivalHours)}:${padZero(arrivalMinutes)}`;
    }

    return times;
}

/**
 * 数値を2桁にゼロパディング
 */
export function padZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * 現在時刻を取得
 */
export function getCurrentTime() {
    const now = new Date();
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    return `${hours}:${minutes}`;
}