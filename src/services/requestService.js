// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/requests`

// ALL REQUESTS IN THIS FILE WILL BEGIN WITH:
// http://localhost:3001/api/requests

async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function show(requestId) {
  try {
    const res = await fetch(`${BASE_URL}/${requestId}`, {
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function create(requestFormData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function update(requestFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${requestFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function deleteRequest(requestId) {
  try {
    const res = await fetch(`${BASE_URL}/${requestId}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function createComment(requestId, commentFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${requestId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  index,
  show,
  create,
  update,
  deleteRequest,
  createComment
}

