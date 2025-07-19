import { requireAuth } from '~/lib/auth';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return null;
}

export default function ProfilePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-4">Profile Settings</h1>
      <p className="text-charcoal-600">User profile settings coming soon...</p>
    </div>
  );
}
