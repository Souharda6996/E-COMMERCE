import { useState } from 'react';
import './Auth.css';

const Login = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        console.log('Logging in with:', email, password);
        // In a real app, you would validate and make an API call here
        if (onLogin) onLogin(); // Callback to parent to handle successful login
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <button className="back-to-home" onClick={() => onNavigate('home')}>✕</button>

                <div className="auth-logo">NAMASTEY INDIA</div>
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Please enter your details to sign in</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="janedoe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-btn">Sign In</button>
                </form>

                <div className="auth-divider"><span>OR CONTINUE WITH</span></div>

                <div className="social-login">
                    <button className="social-btn">
                        <span>G</span> Google
                    </button>
                    <button className="social-btn">
                        <span>f</span> Facebook
                    </button>
                </div>

                <div className="auth-footer">
                    Don't have an account?
                    <button className="auth-link" onClick={() => onNavigate('signup')}>Create account</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
