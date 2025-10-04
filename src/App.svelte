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

  let availableDirections = $derived(getAvailableDirections(departureStation));

  $effect(() => {
    if (
      !availableDirections.includes(direction) &&
      availableDirections.length > 0
    ) {
      direction = availableDirections[0];
    }
  });

  let displayStations = $derived(
    getDisplayStations(departureStation, direction),
  );

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

  let hasTimeInput = $derived(kankouTime !== "" || kyuukouTime !== "");
</script>

<main>
  <h1>到着時刻予想システム</h1>

  <p class="description">
    緩急分離運転線区において、急行と緩行どちらが早く到着するかを比較するシステムです。
  </p>

  <section class="input-section">
    <h2 class="section-title">
      <span class="icon">⚙️</span>
      条件設定
    </h2>
    <div class="card-container">
      <StationSelector bind:value={departureStation} />
      <DirectionSelector bind:value={direction} {availableDirections} />
      <TimeInput bind:kankouTime bind:kyuukouTime />
    </div>
  </section>

  <section class="result-section">
    <h2 class="section-title">
      <span class="icon">📊</span>
      計算結果
    </h2>
    {#if hasTimeInput}
      <ResultTable
        {displayStations}
        {departureStation}
        {kankouArrivalTimes}
        {kyuukouArrivalTimes}
      />
    {:else}
      <div class="empty-state">
        <div class="empty-state-icon">🕐</div>
        <p class="empty-state-title">時刻を入力してください</p>
        <p class="empty-state-description">
          緩行または急行の出発時刻を入力すると、各駅への到着時刻が表示されます
        </p>
      </div>
    {/if}
  </section>
</main>

<style>
  main {
    background-color: var(--color-white);
    padding: 30px;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
  }

  h1 {
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }

  .description {
    color: var(--color-text-muted);
    margin-bottom: 30px;
  }

  .input-section,
  .result-section {
    margin-bottom: 40px;
  }

  .result-section {
    border-top: 3px solid var(--color-border);
    padding-top: 40px;
    margin-top: 40px;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-bottom: var(--spacing-xl);
    font-weight: 600;
  }

  .section-title .icon {
    font-size: 1.2em;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-xl);
  }

  .empty-state {
    background: var(--color-bg-secondary);
    border: 2px dashed var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: 40px;
    text-align: center;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .empty-state-icon {
    font-size: 4em;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
  }

  .empty-state-title {
    font-size: var(--font-size-xl);
    color: var(--color-text-muted);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }

  .empty-state-description {
    color: var(--color-text-muted);
    max-width: 400px;
    line-height: 1.6;
  }
</style>
