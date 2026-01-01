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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const [url, setUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  useEffect(() => {
    if (!token) return;

    const fetchGroup = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://santa-match.onrender.com/groups/${token}`
        );

        if (!res.ok) {
          if (res.status === 404) {
            setError(
              'Error: Group was not found with token: ${token}. Please ensure the link is correct.'
            );
          }
        }

        const data = await res.json();
        setGroupData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
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
      {!loading ? (
        <>
          {error ? (
            <p data-testid="errorMsg" className="mt-40">
              {error}
            </p>
          ) : (
            <main className="flex md:w-[60%] lg:w-[40%] w-[85%] flex-col">
              <h1 className="text-2xl font-bold text-center mt-30">
                {groupData?.name}
              </h1>
              <div className="flex mb-3 justify-center items-center space-x-3">
                {groupData?.budget == 0 ? (
                  <p>No Budget</p>
                ) : (
                  <p>Budget: ${groupData?.budget}</p>
                )}
                <p>Total Participants: {groupData?.participants.length}</p>
              </div>
              <p className="text-center mb-3">
                Copy the link below and share with other participants so they
                can view their match!
              </p>
              <div className="flex mb-3 space-x-3">
                <p
                  data-testid="groupLink"
                  className="flex-1 px-3 py-3 rounded-lg bg-sky-200 text-sm"
                >
                  {url}
                </p>
                <button
                  data-testid="copyLinkBtn"
                  onClick={handleCopy}
                  className="bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 px-3 rounded-lg"
                >
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
              <div data-testid="participants" className="mt-4">
                {groupData?.participants.map((participant, index) => (
                  <div key={index}>
                    <div className="flex flex-row w-full justify-between mb-3">
                      <p className="text-lg mt-1">{participant.name}</p>
                      <div
                        data-testid={`viewStatus-${index}`}
                        className="flex space-x-3"
                      >
                        {participant.revealed ? (
                          <>
                            <button className="bg-sky-200 text-sm text-black px-3 rounded-full py-2">
                              Already Viewed
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => openModal(participant)}
                              className="hover:cursor-pointer text-sm bg-sky-700 text-white rounded-full py-2 px-3"
                            >
                              View Match
                            </button>
                            <button className="bg-red-500 text-sm text-white px-3 rounded-full py-2">
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
          )}
        </>
      ) : (
        <main className="flex md:w-[60%] lg:w-[40%] w-[90%] flex-col items-center justify-center">
          <div className="flex space-x-2 text-sky-900 mt-25">
            <div className="rounded-full motion-safe:animate-bounce border-1 size-5"></div>
            <div className="rounded-full motion-safe:animate-bounce border-1 size-5"></div>
            <div className="rounded-full motion-safe:animate-bounce border-1 size-5"></div>
          </div>
          <h1 className="text-center font-semibold text-xl mt-2 animate-pulse">
            Finding your Secret Santa group...
          </h1>
        </main>
      )}
      {selectedParticipant && (
        <div
          data-testid="viewMatchModal"
          className="fixed bg-sky-200 flex items-center rounded-lg justify-center z-50 p-4 mt-25"
        >
          <div className="p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              Are you {selectedParticipant.name}?
            </h2>
            <p className="text-black mb-6">
              You can only reveal your match{' '}
              <span className="font-bold text-red-600">ONCE!</span> Make sure
              you are selecting your own name!
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => revealMatch(selectedParticipant.token)}
                className="bg-sky-900 text-white rounded-full font-bold py-3 hover:cursor-pointer"
              >
                Yes, reveal my match
              </button>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="text-white rounded-full font-bold hover:cursor-pointer bg-red-500 py-3"
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
