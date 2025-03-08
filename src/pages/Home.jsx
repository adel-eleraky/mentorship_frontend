import React from 'react'
import Hero from '../components/Hero/Hero'
import MentorList from '../components/MentorListScroller/MentorListScroller'
import CareerCoachSection from '../components/CareerCoachSection/CareerCoachSection'
import MentorsSection from '../components/MentorsSection/MentorsSection'

export default function Home() {
    return (
        <div className="container">
            <div className="row border-bottom" style={{height: '550px'}}>
                <div className="col-md-8">
                    <Hero />
                </div>
                <div className="col-md-4">
                    <MentorList />
                </div>
            </div>
            <div className="row my-5">
                <CareerCoachSection/>
            </div>
            <div className="row  my-5">
                <MentorsSection/>
            </div>
        </div>
    )
}
