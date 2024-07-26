import React from "react";
import { useNavigate } from "react-router-dom";
import './Intro.css';

function Intro() {
    const navigate = useNavigate();
    return (
        <>
            <header className="intro-header">
                <nav className="intro-nav">
                    <a href="/login">Login</a>
                    <a href="/signup">Sign Up</a>
                </nav>
            </header>
            <div className="intro-main">
                <h1>Welcome to ASARA GPT</h1>
                <p>This is a platform where you can ask questions and receive personalized answers.</p>
                <button onClick={() => { navigate('/login') }} className="get-started-button">Get Started</button>
            </div>
            <section className="about-us">
                <h2>About Us</h2>
                <div className="team">
                    {['member1', 'member2', 'member3', 'member4'].map((member, index) => (
                        <div className="team-member" key={index}>
                            <img src={`https://path-to-${member}-image.jpg`} alt={`${member}`} className="team-member-image" />
                            <h3>{`Member ${index + 1}`}</h3>
                            <p>Role: Developer</p>
                            <div className="social-links">
                                <a href={`https://github.com/${member}`} target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                                <a href={`https://linkedin.com/in/${member}`} target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="review-form">
                <h2>Add a Review</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Review</label>
                        <textarea id="review" name="review" rows="4" required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </section>
            <footer className="intro-footer">
                <p>Terms of Use | Privacy Policy</p>
            </footer>
        </>
    );
}

export default Intro;
