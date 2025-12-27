'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Participant {
  name: string;
  exclude?: string;
}

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [budget, setBudget] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', exclude: '' },
    { name: '', exclude: '' },
    { name: '', exclude: '' },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addParticipant = () => {
    setParticipants([...participants, { name: '', exclude: '' }]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length <= 3) return;
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Participant,
    value: string
  ) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('https://santa-match.onrender.com/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: groupName,
          budget: budget ? Number(budget) : 0,
          participants,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create group');
      }

      console.log('Group created:', data);
      router.push(`/view-group/${data.token}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center font-sans py-15">
      {!loading ? (
        <main className="flex md:w-[60%] lg:w-[40%] w-[90%] flex-col">
          <h1 className="text-center text-2xl font-bold mb-6">Create Group</h1>
          <form onSubmit={handleSubmit} className="bg-sky-200 rounded-lg p-6">
            <label className="block text-sm font-medium mb-1">Group Name</label>
            <input
              className="w-full mb-4 px-3 py-2 rounded-lg bg-white"
              placeholder="Secret Santa 2025"
              onChange={(e) => setGroupName(e.target.value)}
              required
            />

            <label className="block text-sm font-medium mb-1">
              Budget (optional)
            </label>
            <input
              className="w-full mb-4 px-3 py-2 rounded-lg bg-white"
              placeholder="10"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <label className="block text-sm font-medium mb-2">
              Participants (min. 3)
            </label>
            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div key={index} className="flex space-x-3">
                  <input
                    className="flex-1 w-[100px] px-3 py-2 rounded-lg bg-white mb-2 sm:mb-0"
                    placeholder="Name"
                    value={participant.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, 'name', e.target.value)
                    }
                    required
                  />
                  <input
                    className="flex-1 w-[150px] px-3 py-2 rounded-lg bg-white mb-2 sm:mb-0"
                    placeholder="Don't pair with"
                    value={participant.exclude}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, 'exclude', e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    disabled={participants.length <= 3}
                    className="flex-0.5 px-3 py-2 rounded-lg bg-red-500 text-white mb-2 sm:mb-0"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addParticipant}
              className="opacity-55 hover:opacity-80 hover:cursor-pointer mt-4 w-full bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg py-2 transition"
            >
              + Add Another Participant
            </button>

            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-sky-900 hover:cursor-pointer hover:bg-sky-950 text-white font-semibold rounded-lg py-2 transition"
            >
              {loading ? 'Creating…' : 'Create Group'}
            </button>
          </form>
        </main>
      ) : (
        <main className="flex md:w-[60%] lg:w-[40%] w-[90%] flex-col items-center justify-center">
          <div className="flex space-x-2 text-sky-900">
            <div className="rounded-full motion-safe:animate-bounce border-1 size-5"></div>
            <div className="rounded-full motion-safe:animate-bounce border-1 size-5"></div>
            <div className="rounded-full motion-safe:animate-bounce border-1 size-5"></div>
          </div>
          <h1 className="text-center font-semibold text-xl mt-2 animate-pulse">
            Finding the perfect Secret Santa matches…
          </h1>
        </main>
      )}
    </div>
  );
}
