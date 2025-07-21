import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { User } from './types';

// Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import OnboardingSection from './components/OnboardingSection';
import AIAssistantSection from './components/AIAssistantSection';
import TeacherPoliSection from './components/TeacherPoliSection';
import ResourcesSection from './components/ResourcesSection';
import CommunitySection from './components/CommunitySection';
import SettingsSection from './components/SettingsSection';

// Auth Components
import LoginPage from './components/LoginPage';
import EmailVerificationPage from './components/EmailVerificationPage';
import PasswordCreationPage from './components/PasswordCreationPage';

type AuthStep = 'login' | 'verification' | 'password' | 'authenticated';

export default function App() {
  const [user, setUser] = useLocalStorage<User | null>('teacherpoli_user', null);
  const [activeTab, setActiveTab] = useState('onboarding');
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [currentEmail, setCurrentEmail] = useState('');

  const handleLogin = async (email: string, password?: string) => {
    // Simular login bem-sucedido
    const userData: User = {
      name: email.split('@')[0],
      email,
      isVerified: true,
      hasPassword: true,
      hasGeneratedPlan: false,
      firstAccess: true
    };
    
    setUser(userData);
    setAuthStep('authenticated');
  };

  const handleNeedVerification = (email: string) => {
    setCurrentEmail(email);
    setAuthStep('verification');
  };

  const handleNeedPassword = (email: string) => {
    setCurrentEmail(email);
    setAuthStep('password');
  };

  const handleEmailVerified = () => {
    setAuthStep('password');
  };

  const handlePasswordCreated = () => {
    // Criar usuário após senha criada
    const userData: User = {
      name: currentEmail.split('@')[0],
      email: currentEmail,
      isVerified: true,
      hasPassword: true,
      hasGeneratedPlan: false,
      firstAccess: true
    };
    
    setUser(userData);
    setAuthStep('authenticated');
  };

  const handleBackToLogin = () => {
    setAuthStep('login');
    setCurrentEmail('');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('onboarding');
    setAuthStep('login');
    setCurrentEmail('');
  };

  const handlePlanGenerated = () => {
    if (user) {
      setUser({
        ...user,
        hasGeneratedPlan: true
      });
    }
  };

  // Determine locked tabs based on user progress
  const getLockedTabs = () => {
    if (!user) return [];
    
    const locked = [];
    if (!user.hasGeneratedPlan) {
      locked.push('teacher-poli');
    }
    return locked;
  };

  // Authentication flow
  if (!user || authStep !== 'authenticated') {
    switch (authStep) {
      case 'verification':
        return (
          <EmailVerificationPage
            email={currentEmail}
            onVerified={handleEmailVerified}
            onBack={handleBackToLogin}
          />
        );
      case 'password':
        return (
          <PasswordCreationPage
            email={currentEmail}
            onPasswordCreated={handlePasswordCreated}
            onBack={handleBackToLogin}
          />
        );
      default:
        return (
          <LoginPage
            onLogin={handleLogin}
            onNeedVerification={handleNeedVerification}
            onNeedPassword={handleNeedPassword}
          />
        );
    }
  }

  // Main application
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header userName={user.name} onLogout={handleLogout} />
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        lockedTabs={getLockedTabs()}
      />
      
      <main className="pb-8">
        {activeTab === 'onboarding' && <OnboardingSection />}
        {activeTab === 'ai-assistant' && (
          <AIAssistantSection onPlanGenerated={handlePlanGenerated} />
        )}
        {activeTab === 'teacher-poli' && <TeacherPoliSection />}
        {activeTab === 'resources' && <ResourcesSection />}
        {activeTab === 'community' && <CommunitySection />}
        {activeTab === 'settings' && <SettingsSection />}
      </main>
    </div>
  );
}