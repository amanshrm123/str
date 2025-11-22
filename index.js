<link rel="stylesheet" href="index.css">
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Stx App</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="card-slider">
    <button class="arrow arrow-left" aria-label="Previous card">&#8592;</button>
    <div class="cards">
      <!-- Card 1: Current Project -->
      <section class="card card-1">
        <div class="app-card">
          <header class="app-header">
            <div class="spacer" aria-hidden="true"></div>
            <h1>sTx</h1>
            <div class="theme-toggle">
              <label class="switch" title="Toggle dark theme">
                <input id="themeToggle" type="checkbox" aria-label="Toggle dark theme">
                <span class="slider"></span>
              </label>
            </div>
          </header>
          <div class="inputs-row" role="group" aria-label="Inputs">
            <label class="input-label">
              <span class="label-text">Price</span>
              <input id="numberInput" type="number" inputmode="decimal" step="any" placeholder="Enter price">
            </label>
            <label class="input-label">
              <span class="label-text">Quantity</span>
              <input id="numberInput2" type="number" inputmode="decimal" step="any" placeholder="Enter quantity">
            </label>
          </div>
          <table id="windows" aria-live="polite">
            <thead>
              <tr>
                <th>Window</th>
                <th>Value</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value - 5%</td>
                <td><span id="win5">-</span></td>
                <td><span id="qty5">-</span></td>
              </tr>
              <tr>
                <td colspan="3">
                  <div class="subbox" role="group" aria-label="Subdivisions of 5 percent">
                    <table class="inner">
                      <tbody>
                        <tr>
                          <td>Part A - 2%</td>
                          <td><span id="win2a">-</span></td>
                          <td><span id="qty2a">-</span></td>
                        </tr>
                        <tr>
                          <td>Part B - 2%</td>
                          <td><span id="win2b">-</span></td>
                          <td><span id="qty2b">-</span></td>
                        </tr>
                        <tr>
                          <td>Part C - 1%</td>
                          <td><span id="win1">-</span></td>
                          <td><span id="qty1">-</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Value - 10%</td>
                <td><span id="win10">-</span></td>
                <td><span id="qty10">-</span></td>
              </tr>
              <tr>
                <td colspan="3">
                  <div class="subbox" role="group" aria-label="Subdivisions of 10 percent">
                    <table class="inner">
                      <tbody>
                        <tr>
                          <td>Part A - 3%</td>
                          <td><span id="win3_10">-</span></td>
                          <td><span id="qty3_10">-</span></td>
                        </tr>
                        <tr>
                          <td>Part B - 2%</td>
                          <td><span id="win2_10">-</span></td>
                          <td><span id="qty2_10">-</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Value - 15%</td>
                <td><span id="win15">-</span></td>
                <td><span id="qty15">-</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <!-- Card 2: Sample Project -->
      <section class="card card-2">
        <div class="app-card">
          <header class="app-header">
            <div class="spacer" aria-hidden="true"></div>
            <h1>Project 2</h1>
            <div style="width:36px"></div>
          </header>
          <p style="margin:1.5rem 0;">This is a placeholder for another project. You can add any content here.</p>
        </div>
      </section>
      <!-- Card 3: Sample Project -->
      <section class="card card-3">
        <div class="app-card">
          <header class="app-header">
            <div class="spacer" aria-hidden="true"></div>
            <h1>Project 3</h1>
            <div style="width:36px"></div>
          </header>
          <p style="margin:1.5rem 0;">This is a placeholder for a third project. Add your app or dashboard here.</p>
        </div>
      </section>
    </div>
    <button class="arrow arrow-right" aria-label="Next card">&#8594;</button>
  </div>
  <script src="index.js" defer></script>
</body>
</html>
