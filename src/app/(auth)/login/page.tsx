import LoginForm from '@/components/forms/LoginForm';
import { LinkIcon } from 'lucide-react';

export default function Login() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center">
          <LinkIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">
            LinkSnip - URL Shortener
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
