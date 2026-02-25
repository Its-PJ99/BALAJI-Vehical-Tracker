import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
import { Clock } from 'lucide-react';

export default function SessionExpiredScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 bg-warning/10 rounded-full flex items-center justify-center">
            <Clock className="size-8 text-warning" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Session Expired</h2>
        <p className="text-muted-foreground mb-6">
          Your session has expired due to inactivity. Please log in again to continue.
        </p>
        <Button onClick={() => navigate('/')} className="w-full" size="lg">
          Back to Login
        </Button>
      </Card>
    </div>
  );
}