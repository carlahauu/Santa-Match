'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  const [url, setUrl] = useState('');

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
                  <button className="hover:cursor-pointer bg-sky-700 text-white rounded-full py-3 px-3">
                    View Match
                  </button>
                  {participant.revealed ? (
                    <>
                      <button className="bg-sky-200 text-sm text-black px-3 rounded-full py-3">
                        Already Viewed
                      </button>
                    </>
                  ) : (
                    <>
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
    </div>
  );
}
