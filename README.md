# Performance Report

This report summarizes the performance of the CO2 Data app, measured using **React DevTools Profiler**. Key interactions were analyzed to understand render behavior and component efficiency.

---

## Interactions Checked

- **sorting a column**
- **searching a country**
- **selecting another year**
- **opening modal window and adding columns**

---

## 1. Sorting a Column:

### before:

- **Commit Duration**: 3.2s
- **Render Duration**: 157.1ms
- **Flame Graph**:
  ![sort a column flame graph before](src/assets/sort-a-column-by-pop-ranked-flamegraph.png)
- **Ranked Chart**:
  ![sort a column ranked chart before](src/assets/sort-a-column-by-pop-ranked-flamegraph.png)

### after:

- **Commit Duration**: 2.3s
- **Render Duration**: 150.5ms
- **Flame Graph**:
  ![sort a column flame graph after](src/assets/sort-flamed-after.png)
- **Ranked Chart**:
  ![sort a column ranked chart after](src/assets/sort-ranked-after.png)

---

## 2. Searching a Country:

### before:

- **Commit Duration**: 1.8s
- **Render Duration**: 47.6ms
- **Flame Graph**:
  ![search a country flame graph before](src/assets/search-a-country-flamegraph.png)
- **Ranked Chart**:
  ![search a country ranked chart before](src/assets/search-a-country-ranked.png)

### after:

- **Commit Duration**: 1.4s
- **Render Duration**: 34ms
- **Flame Graph**:
  ![search a country flame graph after](src/assets/search-flame-after.png)
- **Ranked Chart**:
  ![search a country ranked chart after](src/assets/search-ranked-after.png)

---

## 3. Selecting another Year:

### before:

- **Commit Duration**: 2.3s
- **Render Duration**: 130ms
- **Flame Graph**:
  ![select another year flame graph before](src/assets/select-another-year-flamegraph.png)
- **Ranked Chart**:
  ![select another year ranked chart before](src/assets/select-another-year-ranked.png)

### after:

- **Commit Duration**: 2s
- **Render Duration**: 39.5ms
- **Flame Graph**:
  ![select another year flame graph after](src/assets/select-year-flame-after.png)
- **Ranked Chart**:
  ![select another year ranked chart after](src/assets/select-year-ranked-after.png)

---

## 4. Opening modal window and adding columns:

### before:

- **Commit Duration**: 0.9s
- **Render Duration**: 148.4ms
- **Flame Graph**:
  ![Opening modal window and adding columns flame graph before](src/assets/add-columns-flame-before.png)
- **Ranked Chart**:
  ![Opening modal window and adding columns ranked chart before](src/assets/add-columns-ranked-before.png)

### after:

- **Commit Duration**: 0.8s
- **Render Duration**: 141.4ms
- **Flame Graph**:
  ![Opening modal window and adding columns flame graph after](src/assets/add-columns-flame-after.png)
- **Ranked Chart**:
  ![Opening modal window and adding columns ranked chart after](src/assets/add-columns-ranked-after.png)

---

The app now renders faster and more efficiently. User interactions like sorting, searching, selecting years, and adding columns trigger smoother updates, with shorter commit and render durations overall.
