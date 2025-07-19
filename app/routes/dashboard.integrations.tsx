import { requireAuth } from '~/lib/auth';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return null;
}

export default function IntegrationsPage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-4">Integrations</h1>
      <p className="text-charcoal-600">Third-party integrations coming soon...</p>
    </div>
  );
}
