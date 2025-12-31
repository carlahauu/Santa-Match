import Image from 'next/image';
import Link from 'next/link';

const contentSections = [
  {
    name: '',
    content: 'Effective Date: December 30, 2025',
  },
  {
    name: '',
    content:
      'SantaMatch (“we,” “our,” or “us”) is a web application operated by Carla Hau. This Privacy Policy explains how we handle information when you use SantaMatch.',
  },
  {
    name: 'Information Collection And Use',
    content:
      'SantaMatch values your privacy. We do not use advertising networks or third-party analytics tools that collect personal data. To provide the core functionality of the service, SantaMatch stores participant names entered by users when creating a group. This information is used solely to provide and operate the group functionality of our service and is not shared with third parties. Groups and their associated participant names are stored in our PostgreSQL database for 30 days, after which they are automatically deleted. If a user would like their group deleted sooner, they may contact us and we will remove it from our database upon request. Separately, SantaMatch collects anonymous, aggregated usage metrics (such as the total number of groups created) through Prometheus. These metrics do not include participant names or any other personal information and cannot be used to identify individual users.',
  },
  {
    name: 'Third-Party Hosting and Services',
    content: (
      <div>
        <p>
          SantaMatch uses third-party hosting platforms to operate the service:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Vercel for the frontend</li>
          <li>Render for the backend</li>
          <li>Neon for database</li>
        </ul>
        <p>
          These providers may process operational data necessary to deliver the
          service, such as server logs, request metadata, error reports,
          performance metrics, and database operations. No personal data is
          intentionally shared with these providers for marketing or analytics
          purposes. All operational data is handled according to the providers’
          privacy and security policies.
        </p>
      </div>
    ),
  },
  {
    name: 'Changes To This Privacy Policy',
    content:
      'We nay update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will provide a prominent notice on our website prior to the change becoming effective when they are posted on this page.',
  },
  {
    name: 'Contact Us',
    content:
      'If you have any questions about this Privacy Policy, you can contact us at: carlahau110@gmail.com',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col font-sans items-center justify-center">
      <main className="flex md:w-[60%] lg:w-[40%] w-[85%] flex-col mt-40">
        <h1 className="text-left text-2xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-5 mb-10">
          {contentSections.map((item, index) => (
            <div
              key={index}
              className="text-left rounded-2xl items-center flex flex-row"
            >
              <div>
                <h1 className="font-semibold text-lg">{item.name}</h1>
                <h1>{item.content}</h1>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
