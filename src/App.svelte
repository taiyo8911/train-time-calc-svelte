<script>
  import { stations, travelTimes } from "./lib/data.js";

  let departureStation = "錦糸町";
  let direction = "千葉方面";
  let kankouTime = "";
  let kyuukouTime = "";

  // 選択可能な方向を計算（リアクティブ）
  $: availableDirections = getAvailableDirections(departureStation);

  // 方向が選択不可になった場合、自動的に選択可能な方向に変更
  $: {
    if (
      !availableDirections.includes(direction) &&
      availableDirections.length > 0
    ) {
      direction = availableDirections[0];
    }
  }

  // 表示する駅リストを計算（リアクティブ）
  $: displayStations = getDisplayStations(departureStation, direction);

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

  function getAvailableDirections(departure) {
    const available = [];
    if (departure !== "千葉") {
      available.push("千葉方面");
    }
    if (departure !== "錦糸町") {
      available.push("錦糸町方面");
    }
    return available;
  }

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

  <p class="description">
    緩急分離運転線区において、急行と緩行どちらが早く到着するかを比較するシステムです。
  </p>

  <div class="card-container">
    <!-- Step 1: 出発駅選択 -->
    <div class="card">
      <div class="card-header">
        <span class="step-number">1</span>
        <h2>出発駅</h2>
      </div>
      <div class="card-content">
        <select class="large-select" bind:value={departureStation}>
          {#each stations as station}
            <option value={station}>{station}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Step 2: 方向選択 -->
    <div class="card">
      <div class="card-header">
        <span class="step-number">2</span>
        <h2>行き先方面</h2>
      </div>
      <div class="card-content">
        <div class="direction-buttons">
          {#each availableDirections as dir}
            <label class="direction-button" class:selected={direction === dir}>
              <input type="radio" bind:group={direction} value={dir} />
              <span>{dir}</span>
            </label>
          {/each}
        </div>
      </div>
    </div>

    <!-- Step 3: 出発時刻入力 -->
    <div class="card">
      <div class="card-header">
        <span class="step-number">3</span>
        <h2>出発時刻</h2>
      </div>
      <div class="card-content">
        <button class="current-time-btn" on:click={setCurrentTime}>
          現在時刻に設定
        </button>
        <div class="time-inputs">
          <div class="time-input-group">
            <label>緩行</label>
            <input type="time" bind:value={kankouTime} />
          </div>
          <div class="time-input-group">
            <label>急行</label>
            <input type="time" bind:value={kyuukouTime} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="result-section">
    <h2>到着時刻</h2>
    <table class="result-table">
      <thead>
        <tr>
          <th>駅</th>
          <th>緩行</th>
          <th>急行</th>
        </tr>
      </thead>
      <tbody>
        {#each displayStations as station}
          {#if station !== departureStation}
            <tr>
              <th>{station}</th>
              <td>{kankouArrivalTimes[station] || ""}</td>
              <td>{kyuukouArrivalTimes[station] || ""}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  /* グローバルスタイル */
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f5f5f5;

    /* app.cssから移行 */
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(#app) {
    width: 100%;
  }

  /* 既存のスタイルをそのまま維持 */
  main {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #333;
    margin-bottom: 10px;
  }

  .description {
    color: #666;
    margin-bottom: 30px;
  }

  h2 {
    color: #555;
    font-size: 1.1em;
    margin: 0;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .card {
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s;
  }

  .card:hover {
    border-color: #4caf50;
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.1);
  }

  .card-header {
    background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
    color: white;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .step-number {
    background: rgba(255, 255, 255, 0.3);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1em;
  }

  .card-content {
    padding: 20px;
  }

  .large-select {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .large-select:hover {
    border-color: #4caf50;
  }

  .large-select:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }

  .direction-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .direction-button {
    display: flex;
    align-items: center;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
  }

  .direction-button:hover {
    border-color: #4caf50;
    background: #f0f8f0;
  }

  .direction-button.selected {
    border-color: #4caf50;
    background: #e8f5e9;
    font-weight: bold;
  }

  .direction-button input[type="radio"] {
    margin-right: 8px;
    cursor: pointer;
  }

  .direction-button span {
    font-size: 16px;
  }

  .current-time-btn {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    cursor: pointer;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  .current-time-btn:hover {
    background-color: #1976d2;
  }

  .time-inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .time-input-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .time-input-group label {
    font-weight: bold;
    min-width: 60px;
    color: #555;
  }

  .time-input-group input[type="time"] {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 6px;
    transition: border-color 0.2s;
  }

  .time-input-group input[type="time"]:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }

  .result-section {
    margin-top: 40px;
  }

  .result-section h2 {
    font-size: 1.3em;
    margin-bottom: 15px;
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 30%;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
    width: 35%;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  thead th {
    background-color: #4caf50;
    color: white;
    font-weight: bold;
  }

  tbody th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
  }
</style>
