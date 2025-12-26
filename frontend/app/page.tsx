import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex font-sans items-center justify-center">
      <main className="flex flex-col md:flex-row lg:w-[50%] md:w-[65%] w-[85%] lg:justify-between py-20 md:py-30">
        <Image
          src="/Santa.svg"
          alt="Santa holding finger to mouth, indicating secret"
          className="mx-auto"
          width={150}
          height={0}
        />
        <div className="md:ml-10 lg:ml-0 text-center md:text-left lg:w-[60%] mt-10 md:mt-0">
          <h1 className="text-6xl font-semibold">SantaMatch</h1>
          <p className="text-lg mt-4">
            Secret Santa made easy! Add participants, set a budget, share the
            link, and let the gifting begin! No accounts required.
          </p>
          <button className="w-full text-lg hover:cursor-pointer bg-sky-200 px-10 py-2 rounded-full mt-8">
            Get Started!
          </button>
        </div>
      </main>
    </div>
  );
}
