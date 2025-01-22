import React, { useState } from "react";

const UserInputs = () => {
    const [condition, setCondition] = useState(3); // Default to "average"
    const [brand, setBrand] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const conditionLabels = ['Worst', 'Bad', 'Average', 'Good', 'Best'];
    const brands = ['J.', 'Khaddi', 'Gul Ahmed', 'Bonanza Satrangi', 'Sana Safinaz'];
    const ageGroups = ['Under 18', '18-24', '25-34', '35-44', '45 onwards'];
    const genders = ['Male', 'Female'];
    return (
        <div style={{ paddingLeft: '50px' }}>
            <div style={{ marginBottom: '50px' }}>
                <h1>Inputs</h1>
            </div>
            <div style={{
                padding: '20px',
                width: '50%',
                maxWidth: '500px',
                position: 'absolute',
                top: 'calc(50% + 40px)', // Adjust this value based on the height of the h1 and desired spacing
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
            {/* Condition Slider */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="condition-slider" style={{ display: 'block', marginBottom: '8px' }}>
                    Condition:
                </label>
                <input
                    type="range"
                    id="condition-slider"
                    min="1"
                    max="5"
                    value={condition}
                    onChange={(e) => setCondition(Number(e.target.value))}
                    style={{ width: '100%' }}
                />
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                    {conditionLabels[condition - 1]}
                </div>
            </div>

            {/* Brand Dropdown */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="brand-dropdown" style={{ display: 'block', marginBottom: '8px' }}>
                    Brand:
                </label>
                <select
                    id="brand-dropdown"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="">Select a brand</option>
                    {brands.map((b, index) => (
                        <option key={index} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>

            {/* Age Dropdown */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="age-dropdown" style={{ display: 'block', marginBottom: '8px' }}>
                    Age:
                </label>
                <select
                    id="age-dropdown"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="">Select an age group</option>
                    {ageGroups.map((group, index) => (
                        <option key={index} value={group}>
                            {group}
                        </option>
                    ))}
                </select>
            </div>

            {/* Gender Dropdown */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="gender-dropdown" style={{ display: 'block', marginBottom: '8px' }}>
                    Gender:
                </label>
                <select
                    id="gender-dropdown"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="">Select gender</option>
                    {genders.map((g, index) => (
                        <option key={index} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        </div >
    );
};

export default UserInputs;