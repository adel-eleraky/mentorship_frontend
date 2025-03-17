import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { Link } from 'react-router';

export default function Hero() {
    const [oneOnOneText, setOneOnOneText] = useState('');
    const [oneOnOneIndex, setOneOnOneIndex] = useState(0);
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const oneOnOneFullText = ["One-on-One", "One-on-Many"];
    const fullText = ["Web Dev", "JavaScript", "React", "SEO", "Agile", "Interviewing", "Marketing", "UX Design", "AWS", "DevOps", "ML & AI", "Data Science", "Sales", "Python", "Resumé"];
    const typingSpeed = 150;
    const pauseBetweenWords = 1000;

    const categories = [
        "Product Managers",
        "Career Coaches",
        "Software Engineers",
        "Leadership Mentors",
        "UX Designers",
        "Data Scientists",
        "Startup Founders",
    ];

    useEffect(() => {
        if (oneOnOneIndex < oneOnOneFullText.length) {
            const currentWord = oneOnOneFullText[oneOnOneIndex];

            if (oneOnOneText.length < currentWord.length) {
                const timeout = setTimeout(() => {
                    setOneOnOneText(currentWord.slice(0, oneOnOneText.length + 1));
                }, typingSpeed);

                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setOneOnOneText('');
                    setOneOnOneIndex((prevIndex) => prevIndex + 1);
                }, pauseBetweenWords);

                return () => clearTimeout(timeout);
            }
        } else {
            setOneOnOneIndex(0);
        }
    }, [oneOnOneText, oneOnOneIndex, oneOnOneFullText]);

    useEffect(() => {
        if (index < fullText.length) {
            const currentWord = fullText[index];

            if (text.length < currentWord.length) {
                const timeout = setTimeout(() => {
                    setText(currentWord.slice(0, text.length + 1));
                }, typingSpeed);

                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setText('');
                    setIndex((prevIndex) => prevIndex + 1);
                }, pauseBetweenWords);

                return () => clearTimeout(timeout);
            }
        } else {
            setIndex(0);
        }
    }, [text, index, fullText]);

    return (
        <div className="container my-5" style={{lineHeight: '2'}}>
            <p className="text-muted">
                Learn a new skill, launch a project, land your dream career.
            </p>
            <h1 className="fw-bold my-4">
            <span>{oneOnOneText}</span>{oneOnOneText.length < oneOnOneFullText[oneOnOneIndex]?.length} <br />
            <span className="text-success">{text}</span>{text.length < fullText[index]?.length && <span className={styles.cursor}></span>}<br />
            Mentorship
            </h1>
            <div className="d-flex">
                <div style={{ position: 'relative', width: '65%', border: '1px solid gray', borderRadius: '10px', padding: '3px' }}>
                    <input
                        type="text"
                        placeholder="Search by title, skills, or experience"
                        className="form-control w-100 pe-5"
                        style={{
                            paddingRight: '120px',
                            borderRadius: '10px',
                            height: '50px',
                        }}
                    />
                    <Link
                        className="btn btn-success pt-2"
                        style={{
                            position: 'absolute',
                            right: '5px',
                            top: '7px',
                            height: '75%',
                        }}
                        to={'/mentors'}
                    >
                        Find mentors
                    </Link>
                </div>
            </div>
            <div className="w-75 d-flex flex-wrap gap-2 mt-3">
                {categories.map((category, index) => (
                    <span key={index} className="badge bg-light text-secondary p-2 rounded">
                        {category}
                    </span>
                ))}
            </div>
            <div className="my-5">
                <div className="row">
                    <div className="col-md-4">
                        <h2>5,900+</h2>
                        <p className="text-muted">Available mentors</p>
                    </div>
                    <div className="col-md-4">
                        <h2>26,700+</h2>
                        <p className="text-muted">Matches made</p>
                    </div>
                    <div className="col-md-4">
                        <h2>130+</h2>
                        <p className="text-muted">Countries represented</p>
                    </div>
                </div>
            </div>
        </div>
    )
}