// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// assets
import signupIcon from '../../assets/branding/signup.svg'

// css
import styles from './Signup.module.css'

const Signup = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState({ photo: null })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = evt => {
    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await authService.signup(formData, photoData.photo)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <main className={styles.container}>
      <section>
        <img src={signupIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <p>{message}</p>
          <label>
            Name
            <input 
              type="text"
              value={name}
              name="name"
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
          </label>
          <label>
            Upload Photo
            <input type="file" name="photo" onChange={handleChangePhoto} />
          </label>
          <div>
            <button disabled={isFormInvalid() || isSubmitted}>
              {!isSubmitted ? 'SIGN UP' : '🚀 Sending...'}
            </button>
            <Link to="/">CANCEL</Link>
          </div>
        </form>
      </section>
    </main>
      
  )
}

export default Signup
