import { defineNuxtPlugin } from '#app'
import { registerDirectives } from '~/directives/register'

export default defineNuxtPlugin((nuxtApp) => {
    registerDirectives(nuxtApp)
})