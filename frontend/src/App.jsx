import './App.css'
import SideNav from './components/SideNav'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'


function App() {

  return (
    <div className='bg-slate-50'>
    <div className='flex'>
    <SideNav />
    <Dashboard className='relative -z-10' />
    </div>
    </div>
  )
}

export default App
