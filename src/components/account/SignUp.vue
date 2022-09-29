<template>
    <form>
        <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Nome"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :counter="10"
        label="Senha"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        ></v-text-field>
        <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Concorda com nossos termos?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn class="mr-4" @click="submit">Cadastrar</v-btn>
        <br>
        <span>Já possui uma conta? <br> <a href="../entrar">Entre aqui!</a></span>
  </form>
</template>

<script>
/*
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, password } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        name: { required, maxLength: maxLength(10) },
        email: { required, email },
        password: { required, password },
        checkbox: {
            checked (val) {
            return val
            },
        },
    },

    data: () => ({
        name: '',
        email: '',
        password: '',
        checkbox: false,
    }),
    computed: {
        checkboxErrors () {
            const errors = []
            if (!this.$v.checkbox.$dirty) return errors
            !this.$v.checkbox.checked && errors.push('Você deve concordar com os termos para continuar!')
            return errors
        },
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength && errors.push('Campo Nome deve ter pelo menos 10 caracteres')
            !this.$v.name.required && errors.push('Campo Nome é obrigatório.')
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('E-mail inválido')
            !this.$v.email.required && errors.push('Campo E-mail é obrigatório')
            return errors
        },
        passwordErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.maxLength && errors.push('Campo Senha deve ter pelo menos 10 caracteres')
            !this.$v.password.required && errors.push('Campo Senha é obrigatório.')
            return errors
        }
    },
    methods: {
        submit () {
            this.$v.$touch()
        },
    },
}
*/
</script>

<style>

</style>
