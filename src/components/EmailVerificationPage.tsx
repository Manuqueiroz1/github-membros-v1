import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface EmailVerificationPageProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function EmailVerificationPage({ email, onVerified, onBack }: EmailVerificationPageProps) {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos

  // Timer para reenvio
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus próximo input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      // Simular verificação do código
      // Em produção, isso faria uma chamada para a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Código correto simulado: 123456 ou qualquer código para e-mails de teste
      const testEmails = [
        'teste@teacherpoli.com',
        'demo@teacherpoli.com', 
        'admin@teacherpoli.com',
        'test@test.com',
        'usuario@teste.com'
      ];
      
      const isTestEmail = testEmails.includes(email.toLowerCase());
      
      if (code === '123456' || (isTestEmail && code.length === 6)) {
        // Salvar que o usuário foi verificado
        const userData = {
          email,
          isVerified: true,
          hasPassword: false,
          verifiedAt: new Date().toISOString()
        };
        localStorage.setItem(`user_${email}`, JSON.stringify(userData));
        
        onVerified();
      } else {
        setError('Código inválido. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao verificar código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');
    
    try {
      // Simular reenvio do código
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeLeft(300); // Reset timer
      setVerificationCode(['', '', '', '', '', '']);
    } catch (error) {
      setError('Erro ao reenviar código. Tente novamente.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/WhatsApp Image 2025-06-02 at 10.53.02.jpeg" 
            alt="Teacher Poli" 
            className="h-16 w-auto mx-auto mb-4"
          />
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifique seu email</h2>
            <p className="text-gray-600 text-sm">
              Enviamos um código de 6 dígitos para
            </p>
            <p className="text-purple-600 font-semibold">{email}</p>
          </div>

          {/* Code Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Digite o código de verificação
            </label>
            <div className="flex justify-center space-x-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading || verificationCode.join('').length !== 6}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Verificando...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Verificar Código
              </div>
            )}
          </button>

          {/* Resend Code */}
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-500">
                Reenviar código em {formatTime(timeLeft)}
              </p>
            ) : (
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center mx-auto"
              >
                {isResending ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-1" />
                    Reenviando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Reenviar código
                  </>
                )}
              </button>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onBack}
              className="w-full text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Voltar para login
            </button>
          </div>
        </div>

        {/* Help */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Não recebeu o código?{' '}
            <a href="mailto:suporte@teacherpoli.com" className="text-purple-600 hover:text-purple-700 font-medium">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}