import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, CreditCard, Download, Eye, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Purchase {
  id: string;
  productName: string;
  productType: 'course' | 'ebook' | 'subscription';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  purchaseDate: string;
  paymentMethod: string;
  transactionId: string;
  invoice?: {
    url: string;
    number: string;
  };
}

interface PurchaseHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseHistoryModal({ isOpen, onClose }: PurchaseHistoryModalProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadPurchaseHistory();
    }
  }, [isOpen]);

  const loadPurchaseHistory = async () => {
    setIsLoading(true);
    
    // Simular carregamento do histórico
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Dados simulados - em produção, viria da API
    const mockPurchases: Purchase[] = [
      {
        id: '1',
        productName: 'Teacher Poli - Curso Completo de Inglês',
        productType: 'course',
        amount: 297.00,
        currency: 'BRL',
        status: 'completed',
        purchaseDate: '2024-01-15T10:30:00Z',
        paymentMethod: 'Cartão de Crédito',
        transactionId: 'TXN-2024-001',
        invoice: {
          url: '#',
          number: 'INV-2024-001'
        }
      },
      {
        id: '2',
        productName: 'Ebook - Maximizando seu Aprendizado',
        productType: 'ebook',
        amount: 47.00,
        currency: 'BRL',
        status: 'completed',
        purchaseDate: '2024-02-20T14:15:00Z',
        paymentMethod: 'PIX',
        transactionId: 'TXN-2024-002',
        invoice: {
          url: '#',
          number: 'INV-2024-002'
        }
      },
      {
        id: '3',
        productName: 'Curso Stress in Pronunciation',
        productType: 'course',
        amount: 97.00,
        currency: 'BRL',
        status: 'completed',
        purchaseDate: '2024-03-10T09:45:00Z',
        paymentMethod: 'Cartão de Crédito',
        transactionId: 'TXN-2024-003',
        invoice: {
          url: '#',
          number: 'INV-2024-003'
        }
      }
    ];
    
    setPurchases(mockPurchases);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'refunded':
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'refunded':
        return 'Reembolsado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const downloadInvoice = (purchase: Purchase) => {
    // Em produção, isso faria o download real da nota fiscal
    alert(`Baixando nota fiscal: ${purchase.invoice?.number}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Histórico de Compras</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Visualize todas as suas compras e faturas</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Carregando histórico...</p>
              </div>
            </div>
          ) : purchases.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhuma compra encontrada</h3>
              <p className="text-gray-600 dark:text-gray-300">Você ainda não realizou nenhuma compra.</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <ShoppingBag className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Total de Compras</p>
                      <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">{purchases.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">Compras Concluídas</p>
                      <p className="text-lg font-semibold text-green-900 dark:text-green-100">
                        {purchases.filter(p => p.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Valor Total</p>
                      <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        {formatCurrency(
                          purchases.reduce((total, p) => total + p.amount, 0),
                          'BRL'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase List */}
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {purchase.productName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                            {getStatusIcon(purchase.status)}
                            <span className="ml-1">{getStatusText(purchase.status)}</span>
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(purchase.purchaseDate)}
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            {purchase.paymentMethod}
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">Valor:</span>
                            <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(purchase.amount, purchase.currency)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">ID:</span>
                            <span className="ml-1 font-mono text-xs">{purchase.transactionId}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => setSelectedPurchase(purchase)}
                          className="flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Detalhes
                        </button>
                        
                        {purchase.invoice && (
                          <button
                            onClick={() => downloadInvoice(purchase)}
                            className="flex items-center px-3 py-2 text-sm bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-colors"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Nota Fiscal
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Details Modal */}
      {selectedPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detalhes da Compra</h3>
                <button
                  onClick={() => setSelectedPurchase(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Produto
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedPurchase.productName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data da Compra
                  </label>
                  <p className="text-gray-900 dark:text-white">{formatDate(selectedPurchase.purchaseDate)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Valor
                  </label>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {formatCurrency(selectedPurchase.amount, selectedPurchase.currency)}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Método de Pagamento
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedPurchase.paymentMethod}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ID da Transação
                  </label>
                  <p className="text-gray-900 dark:text-white font-mono text-sm">{selectedPurchase.transactionId}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPurchase.status)}`}>
                    {getStatusIcon(selectedPurchase.status)}
                    <span className="ml-1">{getStatusText(selectedPurchase.status)}</span>
                  </span>
                </div>
                
                {selectedPurchase.invoice && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => downloadInvoice(selectedPurchase)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Nota Fiscal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}