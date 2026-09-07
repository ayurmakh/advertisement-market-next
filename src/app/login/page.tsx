import LoginForm from './components/login-form/login-form';
import { loginAction } from './login-action/login-action';

export default function LoginPage() {
    return (
        <div>
            <h3>Login</h3>
            <LoginForm
                loginAction={loginAction}
            />
        </div>
    );
}
