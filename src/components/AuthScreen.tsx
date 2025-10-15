import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import logoImage from 'figma:asset/8f2af9fabd80a047bf63ddfd3bf157046fbd89da.png';

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(email);
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    onLogin("user@gmail.com");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-48 h-48 flex items-center justify-center">
            <img src={logoImage} alt="Kampus Reminder" className="h-40 w-40 object-contain" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email Kata Sandi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-center border-primary"
            required
          />

          {/* Login/Register Buttons */}
          <div className="flex rounded-lg border border-primary overflow-hidden">
            <Button
              type="submit"
              className={`flex-1 rounded-none h-12 ${
                isLogin 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-white text-primary hover:bg-gray-50'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Masuk
            </Button>
            <Button
              type="button"
              className={`flex-1 rounded-none h-12 ${
                !isLogin 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-white text-primary hover:bg-gray-50'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Daftar
            </Button>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-primary text-primary hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Lanjutkan dengan Google
          </Button>
        </form>
      </div>
    </div>
  );
}