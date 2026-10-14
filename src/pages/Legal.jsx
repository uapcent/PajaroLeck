import PageBanner from '../components/PageBanner.jsx';
import { useSite } from '../lib/site.js';

// Placeholder legal copy. Replace with text reviewed by the client's legal advisor.
const pages = (company, privacyPurpose) => ({
  legal: {
    title: 'Legal notice',
    sections: [
      ['Website owner', `This website is owned by ${company.legalName}, with registered address at ${company.address}. Contact: ${company.email}.`],
      ['Terms of use', 'Access to and use of this website implies acceptance of these terms. Users agree to make appropriate use of the content and services offered.'],
      ['Intellectual property', `All content on this website, including text, images and logos, belongs to ${company.legalName} or its licensors and may not be reproduced without permission.`],
      ['Liability', 'We are not responsible for errors or omissions in the content, nor for damage resulting from the use of this website.'],
    ],
  },
  privacy: {
    title: 'Privacy policy',
    sections: [
      ['Data controller', `${company.legalName}, ${company.address}. Email: ${company.email}.`],
      ['Purpose', privacyPurpose],
      ['Legal basis', 'The legal basis is your consent, given when you submit a form on this website.'],
      ['Retention', 'Data is kept only as long as necessary to answer your request and meet legal obligations.'],
      ['Your rights', `You may request access, rectification, erasure, restriction or portability of your data by writing to ${company.email}.`],
    ],
  },
  cookies: {
    title: 'Cookie policy',
    sections: [
      ['What are cookies?', 'Cookies are small files stored on your device when you visit a website.'],
      ['Cookies we use', 'This website only uses technical cookies necessary for it to function. No analytics or advertising cookies are used unless you consent.'],
      ['Managing cookies', 'You can allow, block or delete cookies through your browser settings.'],
    ],
  },
});

export default function Legal({ page }) {
  const { company, privacyPurpose } = useSite();
  const { title, sections } = pages(company, privacyPurpose)[page];
  return (
    <>
      <PageBanner eyebrow="Legal" title={title} />
      <section className="section">
        <div className="container legal">
          {sections.map(([h, body]) => (
            <div key={h}>
              <h2>{h}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
