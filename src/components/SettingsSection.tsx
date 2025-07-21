import React from 'react';
import { Monitor, Moon, Sun, User, Shield, Bell, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function SettingsSection() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Configurações</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Personalize sua experiência de aprendizado</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Palette className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aparência</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Personalize o tema da interface</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tema</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Claro', icon: Sun },
                  { value: 'dark', label: 'Escuro', icon: Moon },
                  { value: 'system', label: 'Sistema', icon: Monitor }
                ].map((themeOption) => {
                  const Icon = themeOption.icon;
                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => setTheme(themeOption.value as any)}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                        theme === themeOption.value
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mb-2 ${
                        theme === themeOption.value ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        theme === themeOption.value ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {themeOption.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conta</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Gerencie suas informações pessoais</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Alterar senha</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dados pessoais</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Histórico de compras</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notificações</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Configure suas preferências de notificação</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail de lembrete</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Receba lembretes para estudar</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Novos conteúdos</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Seja notificado sobre novos materiais</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Comunidade</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Atividades da comunidade WhatsApp</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacidade e Segurança</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Gerencie suas configurações de privacidade</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Política de Privacidade</span>
            <span className="text-gray-400 dark:text-gray-500">→</span>
          </button>
          <button className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Termos de Uso</span>
            <span className="text-gray-400 dark:text-gray-500">→</span>
          </button>
          <button className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Exportar dados</span>
            <span className="text-gray-400 dark:text-gray-500">→</span>
          </button>
          <button className="flex items-center justify-between p-3 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-colors text-red-600 dark:text-red-400">
            <span className="text-sm font-medium">Excluir conta</span>
            <span className="text-red-400 dark:text-red-500">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}