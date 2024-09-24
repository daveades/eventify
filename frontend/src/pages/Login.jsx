import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('All fields are required');
            return;
        }

        setLoading(true); // Set loading to true
        try {
            const response = await fetch('https://eventify-0i10.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('jwt_token', data['access_token']); // Store token
                navigate('/'); // Redirect on success
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred during login');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white rounded transition duration-200 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
