import RegisterForm from './components/register-form';
import { registerAction } from './register-action';

export default function RegisterPage() {
    return (
        <div>
            <h3>Register</h3>
            <RegisterForm
                registerAction={registerAction}
            />
        </div>
    );
}
