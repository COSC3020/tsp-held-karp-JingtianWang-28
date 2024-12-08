# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

///

visitedmask represents the visit of any subset, with 2^n combinations

lastcity has n possibilities

The total number of states is O(n*2^n)

After that, the remaining cities need to be visited, the number is n, and the complexity is O(n)

The total time complexity is theta(n^2 * 2^n)

For each state, an optimal solution value needs to be stored, so it is necessary to store O(n*2^n) equivalent to the number of states

asymptotic memory complexity is theta(n*2^n)

*
visitedmask stores the visit records of cities 0-n, expressed in binary form, from right to left

Suppose n cities are input, if n = 4, visitedmsk = 1011, indicating that cities 0, 1, and 3 have been visited.

1<<n will shift the number to the left by n bits, and may get a value of 2^n, and then 1<<n-1 can get n consecutive "1" binary numbers to mark the visit status of n elements

when use mask, State detection is more efficient, and no method calls are needed for search and insertion. Equality checks or hash calculations are avoided, and only integer operations are required, which is more efficient and saves memory.

///

source:https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-in-python/
https://blog.csdn.net/xcl168/article/details/138730519
https://blog.csdn.net/qq_39559641/article/details/101209534
https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm
https://en.wikipedia.org/wiki/Travelling_salesman_problem

Plagiarism Statement: “I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice
