import Image from 'next/image';
import Link from 'next/link';

const howItWorksItems = [
  {
    name: 'Create Group',
    content:
      'Create your Secret Santa group by adding a group name, budget, and participants! Bonus: You can choose which participants not to match each other with!',
  },
  {
    name: 'Share Group Link',
    content:
      'Share group link with participants! They can view group name, budget, participants, and their match!',
  },
  {
    name: 'View Match',
    content:
      'Participants click on "View Match" next to their name to view who they will be gifting to! Note: A match can only be seen once!',
  },
  {
    name: 'Let the gifting begin!',
    content: "That's all! No accounts required.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col font-sans items-center justify-center">
      <main className="flex flex-col md:flex-row lg:w-[50%] md:w-[65%] w-[85%] lg:justify-between py-40 md:py-50 lg:-ml-25">
        <Image
          src="/Santa.svg"
          alt="Santa holding finger to mouth, indicating secret"
          className="mx-auto"
          width={150}
          height={0}
        />
        <div className="md:ml-10 lg:ml-0 text-center md:text-left lg:w-[60%] mt-10 md:mt-0">
          <h1 data-testid="heroTitle" className="text-6xl font-semibold">
            SantaMatch
          </h1>
          <p data-testid="heroDescription" className="text-lg mt-4">
            Secret Santa made easy! Add participants, set a budget, share the
            link, and let the gifting begin! No accounts required.
          </p>
          <Link href="/create-group">
            <button className="w-full text-lg hover:cursor-pointer bg-sky-200 px-10 py-2 rounded-full mt-8">
              Get Started!
            </button>
          </Link>
        </div>
      </main>
      <div className="md:ml-10 lg:ml-0 text-center md:text-left flex flex-col items-center justify-center lg:w-[60%] mb-20 -mt-20">
        <h1
          data-testid="howItWorksTitle"
          className="text-center font-semibold text-2xl"
        >
          How SantaMatch Works
        </h1>
        <div data-testid="howItWorksItems" className="space-y-6 mt-6 w-3/4">
          {howItWorksItems.map((item, index) => (
            <div
              key={index}
              className="text-left py-4 px-4 rounded-2xl items-center bg-sky-100 flex flex-row"
            >
              <div className="left mr-4">
                <h1 className="bg-sky-200 w-fit px-4 py-1.5 rounded-full text-xl">
                  {index + 1}
                </h1>
              </div>
              <div className="right">
                <h1 className="font-semibold text-lg">{item.name}</h1>
                <h1>{item.content}</h1>
              </div>
            </div>
          ))}
          <Link href="/create-group" className="w-full">
            <button className="w-full text-lg hover:cursor-pointer bg-sky-200 px-10 py-2 rounded-full">
              Get Started Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
