// 🔧 CONFIGURAÇÃO DA API DA HOTMART
// Este arquivo contém as funções para integração com a Hotmart

interface UserCredentials {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}
interface HotmartWebhookPayload {
  event: string;
  data: {
    buyer: {
      email: string;
      name: string;
    };
    purchase: {
      status: string;
      product: {
        id: string;
        name: string;
      };
    };
  };
}

// 🔧 SUBSTITUA ESTAS CONFIGURAÇÕES PELAS SUAS CREDENCIAIS DA HOTMART
const HOTMART_CONFIG = {
  CLIENT_ID: 'your_hotmart_client_id',
  CLIENT_SECRET: 'your_hotmart_client_secret',
  BASIC_TOKEN: 'your_hotmart_basic_token',
  PRODUCT_ID: 'your_product_id'
};

// 🔧 FUNÇÃO PARA SALVAR CREDENCIAIS DO USUÁRIO
export const saveUserCredentials = async (credentials: UserCredentials): Promise<boolean> => {
  try {
    // 🔧 E-MAILS DE TESTE - SEMPRE RETORNAR SUCESSO
    const testEmails = [
      'teste@teacherpoli.com',
      'demo@teacherpoli.com',
      'admin@teacherpoli.com',
      'test@test.com', 
      'usuario@teste.com'
    ];
    
    if (testEmails.includes(credentials.email.toLowerCase())) {
      return true;
    }

    // 🔧 IMPLEMENTAÇÃO REAL - SALVAR NO BACKEND
    // Esta função deve salvar as credenciais do usuário no seu banco de dados
    // IMPORTANTE: A senha deve ser hasheada antes de salvar!
    
    const response = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password, // Hash this password!
        name: credentials.name,
        createdAt: credentials.createdAt
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error saving user credentials:', error);
    return false;
  }
};

// 🔧 FUNÇÃO PARA VALIDAR LOGIN
export const validateUserLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    // 🔧 E-MAILS DE TESTE - ACEITAR QUALQUER SENHA
    const testEmails = [
      'teste@teacherpoli.com',
      'demo@teacherpoli.com',
      'admin@teacherpoli.com', 
      'test@test.com',
      'usuario@teste.com'
    ];
    
    if (testEmails.includes(email.toLowerCase()) && password.length >= 6) {
      return true;
    }

    // 🔧 IMPLEMENTAÇÃO REAL - VALIDAR NO BACKEND
    // Esta função deve validar as credenciais no seu banco de dados
    
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password // This should be hashed and compared
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating user login:', error);
    return false;
  }
};
export const verifyHotmartPurchase = async (email: string): Promise<boolean> => {
  try {
    // 🔧 E-MAILS DE TESTE - REMOVER EM PRODUÇÃO
    const testEmails = [
      'teste@teacherpoli.com',
      'demo@teacherpoli.com',
      'admin@teacherpoli.com',
      'test@test.com',
      'usuario@teste.com'
    ];
    
    if (testEmails.includes(email.toLowerCase())) {
      return true;
    }

    // 🔧 IMPLEMENTAÇÃO REAL DA API DA HOTMART
    // Substitua esta implementação pela integração real com a API da Hotmart
    
    const response = await fetch('https://api-sec-vlc.hotmart.com/payments/api/v1/sales/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HOTMART_CONFIG.BASIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Adicione os parâmetros necessários para buscar por email
    });

    if (!response.ok) {
      throw new Error('Failed to verify purchase');
    }

    const data = await response.json();
    
    // Verificar se o email existe nas compras do produto
    return data.items?.some((purchase: any) => 
      purchase.buyer.email.toLowerCase() === email.toLowerCase() &&
      purchase.product.id === HOTMART_CONFIG.PRODUCT_ID &&
      purchase.status === 'APPROVED'
    ) || false;

  } catch (error) {
    console.error('Error verifying Hotmart purchase:', error);
    return false;
  }
};

export const handleHotmartWebhook = (payload: HotmartWebhookPayload) => {
  // 🔧 PROCESSAMENTO DO WEBHOOK DA HOTMART
  // Esta função deve ser chamada quando receber webhooks da Hotmart
  
  const { event, data } = payload;
  
  switch (event) {
    case 'PURCHASE_APPROVED':
      // Processar compra aprovada
      console.log('Purchase approved for:', data.buyer.email);
      break;
    case 'PURCHASE_REFUNDED':
      // Processar reembolso
      console.log('Purchase refunded for:', data.buyer.email);
  }
}
// 🔧 ENDPOINT PARA RECEBER WEBHOOKS (implementar no backend)
/*
POST /api/hotmart/webhook
{
  "event": "PURCHASE_APPROVED",
  "data": {
    "buyer": {
      "email": "customer@example.com",
      "name": "Customer Name"
    },
    "purchase": {
      "status": "APPROVED",
      "product": {
        "id": "your_product_id",
        "name": "Your Product Name"
      }
    }
  }
}
*/