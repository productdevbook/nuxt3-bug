<template>
  <div class="grid grid-cols-5 min-h-screen background-ts">
    <AtomHInput v-model="email" forname="email" type="email" />
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'
  import {useField, useForm} from 'vee-validate'
  import {string, object} from 'yup'
  export default defineComponent({
    setup() {
      const schema = object({
        email: string().required().email(),
        password: string().min(8).required(),
      })

      const {errors, values, handleSubmit, meta, resetForm} =
        useForm({
          validationSchema: schema,
          initialValues: {
            email: '',
            password: '',
          },
        })

      const {value: email, meta: emailMeta} = useField('email')
      const {value: password, meta: passwordMeta} = useField('password')
      const fieldReturn = {
        email,
        password,
        emailMeta,
        passwordMeta,
      }
      
      return {
        ...fieldReturn,
      }
    }
  })
</script>

<style>
  .scroll-bg {
    -webkit-animation-name: scroll;
    animation-name: scroll;
    -webkit-animation-duration: 30s;
    animation-duration: 30s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
</style>
