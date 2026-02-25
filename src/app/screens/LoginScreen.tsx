import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Truck, AlertCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setShowOtp(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '123456') {
      setError('Invalid OTP. Please try again.');
      return;
    }
    setError('');
    navigate('/trips');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="size-16 bg-primary rounded-xl flex items-center justify-center mb-3">
            <Truck className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">FleetTrack CRM</h1>
          <p className="text-sm text-muted-foreground mt-1">Vehicle Route Tracking System</p>
        </div>

        {/* Login Form */}
        {!showOtp ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="h-12"
                maxLength={10}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                <AlertCircle className="size-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full h-12" size="lg">
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <p className="text-sm text-muted-foreground mb-4">
                OTP sent to +91 {mobile}
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                <AlertCircle className="size-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full h-12" size="lg" disabled={otp.length !== 6}>
              Verify OTP
            </Button>

            <button
              type="button"
              onClick={() => {
                setShowOtp(false);
                setOtp('');
                setError('');
              }}
              className="w-full text-sm text-primary hover:underline"
            >
              Change mobile number
            </button>

            <p className="text-xs text-muted-foreground text-center">
              For demo, use OTP: <span className="font-semibold">123456</span>
            </p>
          </form>
        )}
      </Card>
    </div>
  );
}