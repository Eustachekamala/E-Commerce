import paypal from "paypal-rest-sdk"
import config from "../config/config.mjs"

paypal.configure({
    mode: 'sandbox',
    client_id: config.paypal_client_id,
    client_secret: config.paypal_client_secret
})

export default paypal