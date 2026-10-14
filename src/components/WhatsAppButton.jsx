import { useSite, whatsappLink } from '../lib/site.js';
import { WhatsApp } from './Icons.jsx';

// Floating click-to-chat button. Enable per template with `whatsapp` in its config.
export default function WhatsAppButton() {
  const { whatsapp } = useSite();
  return (
    <a
      className="whatsapp-fab"
      href={whatsappLink(whatsapp.number, whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsApp />
    </a>
  );
}
