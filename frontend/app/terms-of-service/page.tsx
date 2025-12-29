const contentSections = [
  {
    name: '',
    content: 'Last Updated: December 29, 2025',
  },
  {
    name: 'Acceptance of Terms',
    content:
      'By accessing or using the SantaMatch website (the “Service”), you agree to comply with and be bound by these Terms of Service. If you do not agree with these Terms, please do not use the Service.',
  },
  {
    name: 'Changes to Terms',
    content:
      'We may update or modify these Terms at any time. Any changes will be effective immediately upon posting on this page. Continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.',
  },
  {
    name: 'Use of SantaMatch',
    content: (
      <div>
        <p>
          You may use SantaMatch for personal, non-commercial purposes only. You
          agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Reverse-engineer, decompile, or disassemble any part of the Service
          </li>
          <li>
            Use the Service for illegal activities or in violation of any laws
          </li>
          <li>Interfere with or disrupt the operation of the Service</li>
        </ul>
      </div>
    ),
  },
  {
    name: 'Limitation of Liability',
    content: (
      <div>
        <p>
          In no event shall SantaMatch and its creator(s) be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including but not limited to loss of profits, data, use, goodwill, or
          other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Your access to or use of, or inability to access or use, the
            Service.
          </li>
          <li>
            Any unauthorized access to or use of our servers and/or any personal
            information stored therein.
          </li>
        </ul>
      </div>
    ),
  },
  {
    name: 'No Warranties',
    content:
      'SantaMatch is provided on an “as is” and “as available” basis. We make no warranties, express or implied, regarding the reliability, availability, or accuracy of the Service.',
  },
  {
    name: 'Termination',
    content:
      'We reserve the right to suspend or terminate access to SantaMatch at any time, with or without notice, for any reason, including violation of these Terms.',
  },
  {
    name: 'Contact Us',
    content:
      'If you have any questions about these Terms of Service, you can contact us at: carlahau110@gmail.com',
  },
];

export default function TermsOfService() {
  return (
    <div className="flex flex-col font-sans items-center justify-center">
      <main className="flex md:w-[60%] lg:w-[40%] w-[85%] flex-col mt-40">
        <h1 className="text-left text-2xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-5 mb-10">
          {contentSections.map((item, index) => (
            <div
              key={index}
              className="text-left rounded-2xl items-center flex flex-row"
            >
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <h1>{item.content}</h1>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
