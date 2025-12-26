<template>
  <div class="app-shell">
    <header class="top-nav">
      <div class="nav-inner">
        <div class="brand-lockup">
          <div class="brand-mark">N+</div>
          <div class="brand-text">
            <span class="brand-name">NotesPlus</span>
            <span class="brand-tagline">Ideas in motion</span>
          </div>
        </div>
        <nav class="nav-links">
          <router-link to="/" class="nav-link">Workspace</router-link>
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/login" class="nav-cta">Open App</router-link>
        </nav>
      </div>
    </header>
    <main class="page-frame">
      <router-view />
    </main>
    <footer class="page-footer">
      Designed for teams who love calm workspaces. Syncs instantly across every device.
    </footer>
  </div>
</template>
