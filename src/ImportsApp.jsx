import { AppTheme } from './theme';
import { AppRouter } from './router/AppRouter';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Avatar from '../src/assets/uifaces-avatar.webp';
import Sound from '../src/assets/whatsapp-notification.mp3';
import { useEffect, useState } from 'react';
import { CategoriesEmpty } from './Components/categories/CategoriesEmpty';

export const ImportsApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Configurar un temporizador de 4 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <CategoriesEmpty />
      ) : (
        <div>
          <AppTheme>
            <AppRouter />
          </AppTheme>
          <FloatingWhatsApp
            phoneNumber="+50671095580"
            accountName="ChayCR"
            avatar={Avatar}
            statusMessage="En línea"
            chatMessage={`¡Hola bienvenido a ChayCR un gusto atenderle! 🤝 \n¿Cómo te podemos ayudar?`}
            placeholder="Escribir un mensaje"
            darkMode="true"
            allowClickAway="true"
            allowEsc="true"
            notification="true"
            notificationSound="true"
            notificationSoundSrc={Sound}
            onClick=''
            onClose=''
            className='floating-whatsapp'
            chatboxClassName='floating-whatsapp-chatbox'
            notificationClassName='floating-whatsapp-notification'
            buttonStyle={{ bottom: "120px", right: "18px" }}
            chatboxStyle={{
              bottom: "120px",
              right: "10px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
            }}
          />
        </div>
      )}
    </>
  );
};

