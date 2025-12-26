<template>
  <div class="home-view">
    <section class="hero">
      <p class="hero-eyebrow">Calm knowledge base</p>
      <h2 class="hero-title">Run your notes like your favorite Notion workspace.</h2>
      <p class="hero-subtitle">
        Organize ideas, versions, and collaborators in one serene place. Every note stays connected to its
        history, so context never slips away.
      </p>
      <div class="hero-actions">
        <router-link to="/login" class="btn btn-primary">Launch workspace</router-link>
        <button type="button" class="btn btn-ghost" @click="scrollToFeatures">Explore the stack</button>
      </div>
    </section>

    <section class="feature-grid" ref="featureSection">
      <article class="feature-card" v-for="feature in featureList" :key="feature.title">
        <div class="feature-card__icon">{{ feature.icon }}</div>
        <h3 class="feature-card__title">{{ feature.title }}</h3>
        <p class="feature-card__body">{{ feature.body }}</p>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Feature = {
  icon: string
  title: string
  body: string
}

const featureList: Feature[] = [
  {
    icon: '📓',
    title: 'Structured note pages',
    body: 'Compose in clean, minimalist canvases with infinite nesting and slash commands on the roadmap.'
  },
  {
    icon: '🌀',
    title: 'Version history baked in',
    body: 'Every edit becomes a new snapshot so you can roll back confidently and audit who changed what.'
  },
  {
    icon: '🤝',
    title: 'Shared workspaces',
    body: 'Invite teammates, assign ownership, and keep private drafts before promoting them to the team.'
  },
  {
    icon: '⚡',
    title: 'API-first design',
    body: 'Trigger automations or sync with other tools through the REST API exposed by the backend.'
  }
]

const featureSection = ref<HTMLElement | null>(null)

const scrollToFeatures = () => {
  featureSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
