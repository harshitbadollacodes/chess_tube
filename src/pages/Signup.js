import { HomeBanner } from '../components/HomeBanner'
import { SignupForm } from '../components/SignupForm';

export function Signup() {
    return (
        <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
                <HomeBanner />
            </div>
            
            <SignupForm/>


        </div>
    )
}