import { AppTheme } from './theme';
import { AppRouter } from './router/AppRouter';
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import Avatar from "../src/assets/uifaces-avatar.webp"
import Sound from "../src/assets/whatsapp-notification.mp3"

export const ImportsApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
      <FloatingWhatsApp
        phoneNumber="+50671095580"
        accountName="Kámien"
        avatar={Avatar}
        statusMessage="En línea"
        chatMessage={`¡Hola bienvenido a Kámien un gusto atenderle! 🤝 \n¿Cómo te podemos ayudar?`}
        placeholder="Escribir un mensaje"
        darkMode="true"
        allowClickAway="true"
        allowEsc="true"
        className="floating-whatsapp"
        notification="true"
        notificationSound="true"
        notificationSoundSrc={Sound}
        onClick=''
        onClose=''
      />
    </>
  );
};
