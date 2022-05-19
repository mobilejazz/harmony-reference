---
title: Naming convention
---

Find the standard naming convention for each platform:

<table class="naming-table">
  <thead>
    <tr>
      <th></th>
      <th>Kotlin</th>
      <th>Swift</th>
      <th>PHP</th>
      <th>TypeScript</th>
    </tr>
  </thead>
  <tbody>
    <tr class="naming-table__component">
      <td colspan="5">Domain</td>
    </tr>
    <tr>
      <td>Model</td>
      <td colspan="4"><code>Book</code></td>
    </tr>
    <tr>
      <td>Entity<br /><small>(data layer "model")</small></td>
      <td colspan="4"><code>BookEntity</code></td>
    </tr>
    <tr>
      <td>Interactor</td>
      <td colspan="4"><code>GetBooksInteractor</code></td>
    </tr>
    <tr class="naming-table__component">
      <td colspan="5">Data</td>
    </tr>
    <tr>
      <td>Mapper:<br />Model &rarr; Entity</td>
      <td colspan="4"><code>BookToBookEntityMapper</code></td>
    </tr>
    <tr>
      <td>Mapper:<br />Entity &rarr; Model</td>
      <td colspan="4"><code>BookEntityToBookMapper</code></td>
    </tr>
    <tr>
      <td>DataSource</td>
      <td colspan="4"><code>BookNetworkDataSource</code></td>
    </tr>
    <tr>
      <td>Repository</td>
      <td colspan="4"><code>BookRepository</code></td>
    </tr>
    <tr class="naming-table__component">
      <td colspan="5">Dependency Injection<small>(<a href="dependency-injection">more</a>)</small></td>
    </tr>
    <tr>
      <td>Provider</td>
      <td colspan="3"><code>ApplicationProvider</code></td>
      <td><code>app.provider.ts</code></td>
    </tr>
    <tr>
      <td>Component</td>
      <td colspan="3"><code>ApplicationComponent</code></td>
      <td><code>abstract AppProvider</code></td>
    </tr>
    <tr>
      <td>Module</td>
      <td colspan="3"><code>ApplicationDefaultModule</code></td>
      <td><code>AppDefaultProvider</code> + <code>AppProviderModule</code> (<code>app.provider.module.ts</code>)</td>
    </tr>
  </tbody>
</table>
