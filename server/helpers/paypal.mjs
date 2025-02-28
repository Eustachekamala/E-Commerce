import paypal from "@paypal/paypal-server-sdk"


paypal.configure({
    mode: 'sandbox',
    client_id: 'AaxLIY1pmLEm6rTIODISCOCh9TEWCnDKa1RLevnEmqkLvg9pNalFwPS4DE_or_KEx6bEJG1OXGi5e3V9',
    client_userId: 'EFulkCdOC9raY77LayhEzRyRD3xN8LLk30wlgckVy5cXcMs-nH6jrRNWFTa6HaTdxwzRF96rDTHuwnE8'
})

export default paypal