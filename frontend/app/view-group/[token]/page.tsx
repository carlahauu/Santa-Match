'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Group {
  name: string;
  budget?: number;
  token: string;
  participants: Participant[];
}

interface Participant {
  token: string;
  name: string;
  revealed: boolean;
}

export default function ViewMatch() {
  const params = useParams();
  const token = params.token;
  const [groupData, setGroupData] = useState<Group | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const [url, setUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch(`https://santa-match.onrender.com/groups/${token}`)
      .then((res) => res.json())
      .then((data) => setGroupData(data));
  }, [token]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const openModal = (participant: Participant) => {
    setSelectedParticipant(participant);
  };

  const revealMatch = (token: string) => {
    router.push(`/reveal/${token}`);
  };

  return (
    <div className="flex items-center justify-center font-sans py-15">
      <main className="flex md:w-[60%] lg:w-[40%] w-[85%] flex-col">
        <h1 className="text-2xl font-bold text-center">{groupData?.name}</h1>
        <div className="flex mb-3 justify-center items-center space-x-3">
          {groupData?.budget == 0 ? (
            <p>No Budget</p>
          ) : (
            <p>Budget: ${groupData?.budget}</p>
          )}
          <p>Total Participants: {groupData?.participants.length}</p>
        </div>
        <p className="text-center mb-3">
          Copy the link below and share with the participants so they can view
          their match!
        </p>
        <div className="flex mb-3 space-x-3">
          <p className="flex-1 px-3 py-2 rounded-lg bg-sky-200 text-sm">
            {url}
          </p>
          <button
            onClick={handleCopy}
            className="bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 px-3 rounded-lg"
          >
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
        </div>
        <div>
          {groupData?.participants.map((participant, index) => (
            <div key={index}>
              <div className="flex flex-row w-full justify-between mb-3">
                <p className="text-lg">{participant.name}</p>
                <div className="flex space-x-3">
                  {participant.revealed ? (
                    <>
                      <button className="bg-sky-200 text-sm text-black px-3 rounded-full py-3">
                        Already Viewed
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openModal(participant)}
                        className="hover:cursor-pointer bg-sky-700 text-white rounded-full py-3 px-3"
                      >
                        View Match
                      </button>
                      <button className="bg-red-500 text-sm text-white px-3 rounded-full py-3">
                        Not Viewed Yet
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {selectedParticipant && (
        <div className="fixed bg-sky-200 flex items-center rounded-lg justify-center z-50 p-4">
          <div className="p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              Are you {selectedParticipant.name}?
            </h2>
            <p className="text-black mb-6">
              You can only reveal your match{' '}
              <span className="font-bold text-red-600">once</span>. Make sure
              you are selecting your own name!
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => revealMatch(selectedParticipant.token)}
                className="bg-sky-900 text-white rounded-full font-bold py-3 hover:cursor:pointer"
              >
                Yes, Reveal My Match
              </button>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="text-white rounded-full hover:cursor:pointer bg-red-500"
              >
                No, go back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
