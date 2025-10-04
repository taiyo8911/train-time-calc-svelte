<script>
    let {
        displayStations,
        departureStation,
        kankouArrivalTimes,
        kyuukouArrivalTimes,
    } = $props();
</script>

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

<style>
    .result-section {
        margin-top: var(--spacing-xxxl);
    }

    .result-section h2 {
        font-size: var(--font-size-xl);
        margin-bottom: var(--spacing-lg);
        color: var(--color-text);
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
        border: 1px solid var(--color-border);
        padding: var(--spacing-md);
        text-align: left;
    }

    thead th {
        background-color: var(--color-primary);
        color: var(--color-white);
        font-weight: bold;
    }

    tbody th {
        background-color: var(--color-bg);
        font-weight: bold;
    }

    tbody tr:hover {
        background-color: var(--color-bg-tertiary);
    }
</style>
