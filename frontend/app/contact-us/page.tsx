export default function ContactUs() {
  return (
    <div className="flex flex-col font-sans items-center justify-center">
      <main className="flex md:w-[60%] lg:w-[40%] w-[85%] flex-col mt-40 mb-10">
        <h1
          data-testid="contactUsHeading"
          className="text-left text-2xl font-bold mb-6"
        >
          Contact Us
        </h1>
        <p data-testid="contactUsContent">
          Have any questions? Feel free to reach out to: carlahau110@gmail.com
        </p>
      </main>
    </div>
  );
}
