<script>
  import StationSelector from "./lib/components/StationSelector.svelte";
  import DirectionSelector from "./lib/components/DirectionSelector.svelte";
  import TimeInput from "./lib/components/TimeInput.svelte";
  import ResultTable from "./lib/components/ResultTable.svelte";
  import {
    getAvailableDirections,
    getDisplayStations,
    calculateArrivalTimes,
  } from "./lib/utils/timeCalculator.js";

  let departureStation = $state("錦糸町");
  let direction = $state("千葉方面");
  let kankouTime = $state("");
  let kyuukouTime = $state("");

  // 選択可能な方向を計算（リアクティブ）
  let availableDirections = $derived(getAvailableDirections(departureStation));

  // 方向が選択不可になった場合、自動的に選択可能な方向に変更
  $effect(() => {
    if (
      !availableDirections.includes(direction) &&
      availableDirections.length > 0
    ) {
      direction = availableDirections[0];
    }
  });

  // 表示する駅リストを計算（リアクティブ）
  let displayStations = $derived(
    getDisplayStations(departureStation, direction),
  );

  // 到着時刻を計算（リアクティブ）
  let kankouArrivalTimes = $derived(
    calculateArrivalTimes(
      "緩行",
      kankouTime,
      displayStations,
      departureStation,
      direction,
    ),
  );
  let kyuukouArrivalTimes = $derived(
    calculateArrivalTimes(
      "急行",
      kyuukouTime,
      displayStations,
      departureStation,
      direction,
    ),
  );
</script>

<main>
  <h1>緩急分離運転到着予想システム</h1>

  <p class="description">
    緩急分離運転線区において、急行と緩行どちらが早く到着するかを比較するシステムです。
  </p>

  <div class="card-container">
    <StationSelector bind:value={departureStation} />
    <DirectionSelector bind:value={direction} {availableDirections} />
    <TimeInput bind:kankouTime bind:kyuukouTime />
  </div>

  <ResultTable
    {displayStations}
    {departureStation}
    {kankouArrivalTimes}
    {kyuukouArrivalTimes}
  />
</main>

<style>
  main {
    background-color: var(--color-white);
    padding: var(--spacing-xxl);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
  }

  h1 {
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }

  .description {
    color: var(--color-text-tertiary);
    margin-bottom: var(--spacing-xxl);
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xxl);
  }
</style>
