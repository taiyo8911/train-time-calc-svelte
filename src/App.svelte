<script>
  import { stations, travelTimes } from "./lib/data.js";

  let departureStation = "錦糸町";
  let direction = "千葉方面";
  let kankouTime = "";
  let kyuukouTime = "";

  let directionError = "";

  // 表示する駅リストを計算（リアクティブ）
  $: displayStations = getDisplayStations(departureStation, direction);

  // 方向エラーチェック（リアクティブ）
  $: {
    if (
      (departureStation === "千葉" && direction === "千葉方面") ||
      (departureStation === "錦糸町" && direction === "錦糸町方面")
    ) {
      directionError = "この方向には駅がありません。";
    } else {
      directionError = "";
    }
  }

  // 到着時刻を計算（リアクティブ）
  $: kankouArrivalTimes = calculateArrivalTimes(
    "緩行",
    kankouTime,
    displayStations,
    departureStation,
    direction,
  );
  $: kyuukouArrivalTimes = calculateArrivalTimes(
    "急行",
    kyuukouTime,
    displayStations,
    departureStation,
    direction,
  );

  function getDisplayStations(departure, dir) {
    const departureIndex = stations.indexOf(departure);
    const result = [];

    if (dir === "千葉方面") {
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

  function calculateArrivalTimes(
    trainType,
    startTime,
    displayStations,
    departure,
    dir,
  ) {
    if (!startTime) return {};

    const [hours, minutes] = startTime.split(":").map(Number);
    const startTotalMinutes = hours * 60 + minutes;
    const times = {};

    const directionKey = dir;
    const trainTypeJa = trainType;

    for (const station of displayStations) {
      if (station === departure) continue;

      const fromTime = travelTimes[directionKey][trainTypeJa][departure];
      const toTime = travelTimes[directionKey][trainTypeJa][station];
      const travelTime = Math.abs(toTime - fromTime);

      const arrivalTime = startTotalMinutes + travelTime;
      const arrivalHours = Math.floor(arrivalTime / 60) % 24;
      const arrivalMinutes = arrivalTime % 60;

      times[station] = `${padZero(arrivalHours)}:${padZero(arrivalMinutes)}`;
    }

    return times;
  }

  function padZero(num) {
    return num < 10 ? "0" + num : num;
  }

  function setCurrentTime() {
    const now = new Date();
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const currentTime = `${hours}:${minutes}`;

    kankouTime = currentTime;
    kyuukouTime = currentTime;
  }
</script>

<main>
  <h1>緩急分離運転到着予想システム</h1>

  <p>
    緩急分離運転線区においてどちらが早く到着するかを比較できるシステムです。出発駅と方向を選択してください。
  </p>

  <div class="controls">
    <div class="control-group">
      <label for="departureStation">出発駅:</label>
      <select id="departureStation" bind:value={departureStation}>
        {#each stations as station}
          <option value={station}>{station}</option>
        {/each}
      </select>
    </div>

    <div class="control-group">
      <label>方向:</label>
      <label>
        <input type="radio" bind:group={direction} value="千葉方面" />
        千葉方面
      </label>
      <label>
        <input type="radio" bind:group={direction} value="錦糸町方面" />
        錦糸町方面
      </label>
      {#if directionError}
        <div class="error">{directionError}</div>
      {/if}
    </div>

    <div class="control-group">
      <button on:click={setCurrentTime}>現在時刻に設定</button>
    </div>
  </div>

  <table id="timeTable">
    <thead>
      <tr>
        <th></th>
        <th>緩行列車の出発時刻</th>
        <th>急行列車の出発時刻</th>
      </tr>
    </thead>
    <tbody>
      {#each displayStations as station}
        <tr>
          <th>{station}</th>
          {#if station === departureStation}
            <td>
              <input type="time" bind:value={kankouTime} />
            </td>
            <td>
              <input type="time" bind:value={kyuukouTime} />
            </td>
          {:else}
            <td>{kankouArrivalTimes[station] || ""}</td>
            <td>{kyuukouArrivalTimes[station] || ""}</td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    color: #333;
  }

  .controls {
    margin: 20px 0;
  }

  .control-group {
    margin: 15px 0;
  }

  label {
    margin-right: 10px;
  }

  button {
    padding: 8px 16px;
    margin-right: 10px;
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
  }

  button:hover {
    background-color: #45a049;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 15%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 35%;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 35%;
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

  .error {
    color: red;
    display: block;
    margin-top: 5px;
  }

  input[type="time"] {
    padding: 4px;
    font-size: 14px;
  }
</style>
