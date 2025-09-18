const LoginForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  error, 
  isSubmitting, 
  handleSubmit 
}) => {
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="card login-container">
      <h1 className="text-center mb-4">Student Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-field">
          <label className="login-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            className="login-input"
            autoComplete="email"
          />
        </div>
        <div className="login-field">
          <label className="login-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            className="login-input"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div className="login-error">{error}</div>
        )}
        <button type="submit" disabled={isSubmitting} className="login-button">
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="login-help">
        Use your student credentials to sign in
      </p>
    </div>
  )
}

export default LoginForm
