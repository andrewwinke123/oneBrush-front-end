// npm modules
import { useState } from "react"

// css
import styles from './NewRequest.module.css'

import axios from 'axios'

const NewRequest = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Residential',
    photos: [],
  })
  
  const handlePhotoUpload = async (event) => {
    const files = event.target.files
    const uploadPromises = Array.from(files).map((file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'YOUR_UNSIGNED_UPLOAD_PRESET')
      
      return axios.post('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', formData)
    })
    
    const uploadResults = await Promise.all(uploadPromises)
    const photoUrls = uploadResults.map((res) => res.data.secure_url)
    setFormData({ ...formData, photos: [...formData.photos, ...photoUrls] })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleAddRequest(formData)
  }

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text" 
          name="title"
          id="title-input"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
				<textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          placeholder="Text"
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Games">Residential</option>
          <option value="News">Comercial</option>
          <option value="Music">Other</option>
        </select>
        <input type="file" multiple onChange={handlePhotoUpload} />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default NewRequest