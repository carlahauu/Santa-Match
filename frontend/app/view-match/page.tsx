'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ViewMatch() {
  const [url, setUrl] = useState('');

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (value: string) => {
    setUrl(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmedInput = url.trim();

    const token = trimmedInput.split('/').pop();

    if (token) {
      router.push(`/view-group/${token}`);
    } else {
      setError('Please enter a valid link or token.');
    }
  };

  return (
    <div className="flex items-center justify-center font-sans py-15">
      <main className="flex md:w-[60%] lg:w-[40%] w-[90%] flex-col">
        <h1 className="text-center text-2xl font-bold mb-1">
          View Group/Match
        </h1>
        <p className="text-center mb-6">
          Paste link below and submit to view group participants, your match,
          and the budget!
        </p>
        <form onSubmit={handleSubmit} className="bg-sky-200 rounded-lg p-6">
          <label className="block text-sm font-medium mb-1">
            Group Link (should've been shared by host!)
          </label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-white"
            placeholder="https://santamatch.carlahau.com/view-group/random-token"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 w-full bg-sky-900 hover:cursor-pointer hover:bg-sky-950 text-white font-semibold rounded-lg py-2 transition"
          >
            View Group
          </button>
        </form>
      </main>
    </div>
  );
}
