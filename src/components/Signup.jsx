import { useState } from 'react';
import './Auth.css';

const Signup = ({ onNavigate, onSignup }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate signup
        console.log('Signing up with:', formData);
        if (onSignup) onSignup();
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <button className="back-to-home" onClick={() => onNavigate('home')}>✕</button>

                <div className="auth-logo">NAMASTEY INDIA</div>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join us for exclusive access and rewards</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Jane Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="janedoe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="auth-btn">Create Account</button>
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
                    Already have an account?
                    <button className="auth-link" onClick={() => onNavigate('login')}>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
