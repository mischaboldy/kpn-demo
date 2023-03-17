import axios from 'axios'

const { Router } = require('express')
const router = Router()

router.use('/GetPhones', async (_req: any, res: any) => {
  if (!process.env.KPN_PHONE_JSON_URL) {
    res.status(500).json({})
    return
  }

  try {
    const client = axios
    const response = await client.get(process.env.KPN_PHONE_JSON_URL)
    const phones = response?.data?.products || []

    res.status(200).json(phones)
  } catch (error) {
    res.status(500).json({})
  }
})

module.exports = router
