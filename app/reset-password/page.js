import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
