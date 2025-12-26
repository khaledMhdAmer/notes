<template>
  <div class="auth-shell">
    <section class="auth-card">
      <div class="auth-toggle" role="tablist" aria-label="Authentication mode selector">
        <button
          type="button"
          class="auth-toggle__btn"
          :class="{ 'is-active': !isSignup }"
          :aria-pressed="!isSignup"
          @click="setMode('login')"
        >
          Sign in
        </button>
        <button
          type="button"
          class="auth-toggle__btn"
          :class="{ 'is-active': isSignup }"
          :aria-pressed="isSignup"
          @click="setMode('signup')"
        >
          Create account
        </button>
      </div>

      <p class="hero-eyebrow">{{ eyebrowCopy }}</p>
      <h2 class="auth-heading">{{ headingCopy }}</h2>
      <p class="auth-subtitle">{{ subheadingCopy }}</p>

      <form class="form-stack" @submit.prevent="handleSubmit">
        <div v-if="isSignup" class="form-field">
          <label class="field-label" for="name">Full name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="input-control"
            placeholder="Jamie Example"
            required
          />
        </div>

        <div class="form-field">
          <label class="field-label" for="email">Work email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input-control"
            placeholder="you@team.com"
            required
          />
        </div>

        <div class="form-field">
          <label class="field-label" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input-control"
            placeholder="••••••••"
            required
            minlength="8"
          />
          <span class="form-hint">
            Use at least 8 characters. We never store plain-text credentials.
          </span>
        </div>

        <div v-if="isSignup" class="form-field">
          <label class="field-label" for="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            class="input-control"
            placeholder="Repeat password"
            required
            minlength="8"
          />
          <span class="form-hint">Passwords must match before we can create your space.</span>
        </div>

        <p v-if="errorMessage" class="form-feedback form-feedback--error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="form-feedback form-feedback--success">{{ successMessage }}</p>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? 'Working...' : submitCopy }}
        </button>
      </form>

      <p class="auth-meta">
        {{ metaPrompt }}
        <button type="button" class="link-inline link-inline--button" @click="toggleMode">
          {{ metaAction }}
        </button>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { login as loginRequest, register as registerRequest } from '../services/auth'

type AuthMode = 'login' | 'signup'

const mode = ref<AuthMode>('login')
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const isSignup = computed(() => mode.value === 'signup')
const eyebrowCopy = computed(() => (isSignup.value ? 'Create workspace access' : 'Sign back in'))
const headingCopy = computed(() => (isSignup.value ? "Let's get your team set up" : 'Welcome back to NotesPlus'))
const subheadingCopy = computed(() =>
  isSignup.value
    ? 'Invite-only for now. Spin up an account and start drafting with full version history.'
    : 'Access your calm workspace and keep every version of your thinking close.'
)
const submitCopy = computed(() => (isSignup.value ? 'Create account' : 'Sign in'))
const metaPrompt = computed(() => (isSignup.value ? 'Already part of NotesPlus?' : 'New to NotesPlus?'))
const metaAction = computed(() => (isSignup.value ? 'Go to login' : 'Create an account'))

const setMode = (nextMode: AuthMode) => {
  if (mode.value === nextMode) return
  mode.value = nextMode
  errorMessage.value = ''
  successMessage.value = ''
}

const toggleMode = () => {
  setMode(isSignup.value ? 'login' : 'signup')
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (isSignup.value && password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    if (isSignup.value) {
      await registerRequest({
        name: name.value,
        email: email.value,
        password: password.value
      })

      successMessage.value = 'Account created. Sign in to continue.'
      mode.value = 'login'
      password.value = ''
      confirmPassword.value = ''
      return
    }

    const data = await loginRequest({ email: email.value, password: password.value })

    if (data?.token) {
      localStorage.setItem('token', data.token)
      window.location.href = '/notes'
      return
    }

    throw new Error('Login succeeded but no token was returned.')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Something went wrong. Please retry.'
  } finally {
    loading.value = false
  }
}
</script>
