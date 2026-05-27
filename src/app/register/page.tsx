import RegisterForm from './components/register-form/register-form';
import { registerAction } from '@/app/register/register-action/register-action';

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
