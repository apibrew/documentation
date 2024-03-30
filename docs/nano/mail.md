# Send Mail

You can send mail with help of `mailer` function.

### Syntax

```javascript
// setup mailer object

const User = resource('system/User')

const mail = mailer({
    host: 'smtp-relay.brevo.com',
    port: 587,
    enableAuth: true,
    enableTls: true,
    username: '<username>',
    password: '<password>'
})

User.beforeCreate(user => {
    mail.send({
        from: 'contact@apibrew.io',
        fromName: 'ApiBrew',
        to: user.username,
        toName: user.username,
        subject: 'Welcome to ApiBrew',
        body: 'Welcome to ApiBrew'
    })
})

