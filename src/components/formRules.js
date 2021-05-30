const rules = {
  nameRules: [
    v => !!v || 'Numele este obligatoriu',
    v => (v && v.length > 3) || 'Numele trebuie sa contina mai mult de 3 caractere'
  ],
  emailRules: [
    v => !!v || 'Emailul este obligatoriu',
    v => /.+@.+/.test(v) || 'Email-ul nu este valid'
  ]
}

export default rules
