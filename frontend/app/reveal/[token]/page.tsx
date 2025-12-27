'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewMatch() {
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState('');
  const params = useParams();
  const token = params.token;

  useEffect(() => {
    fetch(`https://santa-match.onrender.com/participants/reveal/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to reveal match');
        return res.json();
      })
      .then((data) => setMatch(data.assigned_to))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="flex items-center justify-center font-sans py-15">
      <main className="flex md:w-[60%] lg:w-[40%] w-[90%] flex-col">
        <h1 className="text-center text-2xl font-bold mb-6">
          You will be gifting to {match}!
        </h1>
      </main>
    </div>
  );
}
