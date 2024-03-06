// npm modules
import { useState } from "react"
import { useLocation } from "react-router-dom"

// css 
import styles from './EditRequest.module.css'

const EditRequest = (props) => {
  const { state } = useLocation()
  const [formData, setFormData] = useState(state) 

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleUpdateRequest(formData)
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
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default EditRequest