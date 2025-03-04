import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Google } from '../general/Icons';
import { GeneralSubmitButton } from '../general/SubmitButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default async function LoginForm() {
  const session = await auth();

  if (session?.user) {
    return redirect('/dashboard');
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your Google Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 ">
            <form
              action={async () => {
                'use server';

                await signIn('google', {
                  redirectTo: '/dashboard',
                });
              }}
            >
              <GeneralSubmitButton className="w-full" variant="outline">
                <Google className="size-4" />
                {' '}
                Login with Google
              </GeneralSubmitButton>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        By Clicking continue, you agree to our Terms of Service and privacy
        policy
      </div>
    </div>
  );
}
