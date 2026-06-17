import { Link } from 'react-router-dom'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        InternPortal
      </Link>
      
      <div className="flex gap-6 items-center">
        <Link to="/internships" className="text-gray-600 hover:text-blue-600 font-medium">Internships</Link>
        
        <SignedIn>
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  )
}