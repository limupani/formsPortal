import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../components/layout/Logo'
import TextField from '../../components/form-fields/TextField'
import FormRow from '../../components/form-fields/FormRow'
import Button from '../../components/ui/Button'
import { useAuth } from './AuthContext'
import styles from './SignInPage.module.css'

export default function SignInPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    signIn({ name: name.trim(), email: email.trim() })
    const redirectTo = location.state?.from?.pathname ?? '/portal'
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Logo to="/sign-in" />
        <h1 className={styles.heading}>Sign in to the Portal</h1>
        <p className={styles.subtext}>Use your company account to continue.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormRow label="Full Name :" htmlFor="name" stacked>
            <TextField id="name" value={name} onChange={setName} placeholder="Jane Doe" />
          </FormRow>
          <FormRow label="Company Email :" htmlFor="email" stacked>
            <TextField id="email" type="email" value={email} onChange={setEmail} placeholder="jane.doe@engro.com" />
          </FormRow>

          <Button type="submit" variant="primary">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
