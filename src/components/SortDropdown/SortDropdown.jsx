import React from 'react'

export default function SortDropdown({ sortOption, setSortOption }) {
    return (
        <div className='w-25'>
            <select
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option>Most Recent Activity</option>
                <option>Most Popular</option>
                <option>Answered Questions</option>
                <option>Unanswered Questions</option>
            </select>
        </div>
    )
}
