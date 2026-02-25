import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="size-8 text-destructive" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this resource. Please contact your administrator if
          you believe this is an error.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/trips')} variant="outline" className="flex-1" size="lg">
            Go to Trips
          </Button>
          <Button onClick={() => navigate('/')} className="flex-1" size="lg">
            Back to Login
          </Button>
        </div>
      </Card>
    </div>
  );
}