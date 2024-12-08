function tsp_hk(distance_matrix) {
    if (!Array.isArray(distance_matrix) || distance_matrix.length === 0) return 0;
    const n = distance_matrix.length;
    if (n === 1) return 0;
    if (n === 2) return distance_matrix[0][1] || 0;

    let memo = {};

    function heldKarp(visitedMask, lastCity) {
        if (visitedMask === (1 << n) - 1) return 0;

        const memoKey = `${visitedMask}-${lastCity}`;
        if (memoKey in memo) return memo[memoKey];

        let minCost = Infinity;
        for (let nextCity = 0; nextCity < n; nextCity++) {
            if (!(visitedMask & (1 << nextCity))) {
                const newVisitedMask = visitedMask | (1 << nextCity);
                const cost =
                    distance_matrix[lastCity][nextCity] +
                    heldKarp(newVisitedMask, nextCity);
                minCost = Math.min(minCost, cost);
            }
        }

        memo[memoKey] = minCost;
        return minCost;
    }

    let result = Infinity;
    for (let startCity = 0; startCity < n; startCity++) {
        result = Math.min(result, heldKarp(1 << startCity, startCity));
    }

    return result;
}
