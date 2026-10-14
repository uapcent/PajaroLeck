import { Link } from 'react-router-dom';
import { useSite } from '../lib/site.js';

// Texto legal de ejemplo. Antes de publicar la web de un cliente, debe revisarlo su asesor legal.
const pages = (company, privacyPurpose) => ({
  legal: {
    title: 'Aviso legal',
    sections: [
      ['Datos del titular', `En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), le informamos de que este sitio web pertenece a ${company.legalName}, con NIF ${company.nif} y domicilio en ${company.address}. Correo electrónico: ${company.email}. Teléfono: ${company.phone}.`],
      ['Condiciones de uso', 'El acceso a esta web implica la aceptación de estas condiciones. La persona usuaria se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos.'],
      ['Propiedad intelectual', `Los textos, imágenes y logotipos de esta web pertenecen a ${company.legalName} o a sus licenciantes y no pueden reproducirse sin autorización.`],
      ['Responsabilidad', 'No nos hacemos responsables de los errores u omisiones en los contenidos ni de los daños que pudieran derivarse del uso de esta web.'],
    ],
  },
  privacy: {
    title: 'Política de privacidad',
    sections: [
      ['Responsable del tratamiento', `${company.legalName} (NIF ${company.nif}), ${company.address}. Correo electrónico: ${company.email}.`],
      ['Finalidad', privacyPurpose],
      ['Legitimación', 'Su consentimiento, que nos da al marcar la casilla y enviar el formulario (artículo 6.1.a del Reglamento General de Protección de Datos).'],
      ['Conservación', 'Guardamos sus datos solo el tiempo necesario para atender su solicitud y cumplir con nuestras obligaciones legales.'],
      ['Destinatarios', 'No cedemos sus datos a terceros, salvo obligación legal.'],
      ['Sus derechos', `Puede pedir el acceso, rectificación, supresión, oposición, limitación o portabilidad de sus datos escribiendo a ${company.email}. Si cree que no hemos tratado bien sus datos, puede reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`],
    ],
  },
  cookies: {
    title: 'Política de cookies',
    sections: [
      ['¿Qué son las cookies?', 'Son pequeños archivos que una web guarda en su dispositivo cuando la visita.'],
      ['Cookies que usamos', 'Esta web solo utiliza cookies técnicas, necesarias para que funcione. No usamos cookies de análisis ni de publicidad, por lo que no necesitamos su consentimiento (artículo 22.2 de la LSSI-CE).'],
      ['Cómo gestionarlas', 'Puede permitir, bloquear o borrar las cookies desde la configuración de su navegador.'],
    ],
  },
});

export default function Legal({ page }) {
  const { company, privacyPurpose, home } = useSite();
  const { title, sections } = pages(company, privacyPurpose)[page];
  return (
    <div className="legal-page">
      <p className="legal-page__back">
        <Link to={home}>← Volver al inicio</Link>
      </p>
      <h1>{title}</h1>
      {sections.map(([h, body]) => (
        <section key={h}>
          <h2>{h}</h2>
          <p>{body}</p>
        </section>
      ))}
    </div>
  );
}

// Footer links to the three legal pages (paths under the template's base).
export function LegalLinks() {
  const { base } = useSite();
  return (
    <>
      <Link to={`${base}/aviso-legal`}>Aviso legal</Link>
      <Link to={`${base}/politica-de-privacidad`}>Privacidad</Link>
      <Link to={`${base}/politica-de-cookies`}>Cookies</Link>
    </>
  );
}

// Route elements for the legal pages, to drop inside a template's <Routes>.
export const legalRoutes = [
  ['aviso-legal', 'legal'],
  ['politica-de-privacidad', 'privacy'],
  ['politica-de-cookies', 'cookies'],
];
