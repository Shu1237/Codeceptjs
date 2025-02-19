const { I } = inject();

module.exports = {
    fields: {
        email: '#email',
        password: '#password',
    },
    submitButton: '#submit',

    fillForm(email, password) {
        I.fillField(this.fields.email, email);
        I.fillField(this.fields.password, password);
    },

    submitForm() {
        I.click(this.submitButton);
    },
};
