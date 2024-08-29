'use client';

import { AppHero } from '../ui/ui-layout';
import { useState } from 'react';

// Function to display a modal for creating a new poll
const CreatePollModal = ({ isOpen, onClose, onCreatePoll }) => {
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollCategory, setNewPollCategory] = useState('');

  const handleCreatePoll = () => {
    if (newPollQuestion.trim() && newPollCategory.trim()) {
      onCreatePoll(newPollQuestion, newPollCategory);
      setNewPollQuestion('');
      setNewPollCategory('');
      onClose();
    } else {
      alert('Please enter both question and category.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Create a New Poll</h2>
        <input
          type="text"
          value={newPollQuestion}
          onChange={(e) => setNewPollQuestion(e.target.value)}
          placeholder="Enter poll question"
          className="mb-4 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full"
        />
        <input
          type="text"
          value={newPollCategory}
          onChange={(e) => setNewPollCategory(e.target.value)}
          placeholder="Enter poll category"
          className="mb-6 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCreatePoll}
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:bg-green-700 hover:scale-105"
          >
            Create Poll
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:bg-red-700 hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to display a modal with the full question
const Modal = ({ isOpen, onClose, question }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Poll Question</h2>
        <p className="text-lg mb-6 text-gray-800">{question}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:bg-red-700 hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function DashboardFeature() {
  const [polls, setPolls] = useState([
    {
      question: 'Will India win the upcoming World Cup match against Pakistan?',
      category: 'Cricket',
    },
    {
      question: 'Will NVIDIA\'s recent earnings lead to a stock market surge today?',
      category: 'Stock Market',
    },
    {
      question: 'Is the current tech partnership between Microsoft and Palantir?',
      category: 'Business',
    },
    {
      question: 'Do you think AI will revolutionize the tech landscape in the next year?',
      category: 'Technology',
    },
  ]);

  const [votes, setVotes] = useState(Array(polls.length).fill(null));
  const [betValues, setBetValues] = useState(Array(polls.length).fill(''));
  const [totalBets, setTotalBets] = useState(Array(polls.length).fill({ yes: 0, no: 0 }));

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePollModalOpen, setIsCreatePollModalOpen] = useState(false);

  const handleVote = (index, vote) => {
    const newVotes = [...votes];
    newVotes[index] = vote;
    setVotes(newVotes);
  };

  const handleBetChange = (index, value) => {
    const newBetValues = [...betValues];
    newBetValues[index] = value;
    setBetValues(newBetValues);
  };

  const handlePlaceBet = (index) => {
    const newTotalBets = [...totalBets];
    if (votes[index] === 'Yes') {
      newTotalBets[index].yes += parseFloat(betValues[index]);
    } else {
      newTotalBets[index].no += parseFloat(betValues[index]);
    }
    setTotalBets(newTotalBets);
    alert(`You placed a bet of $${betValues[index]} on "${polls[index].question}" with a "${votes[index]}" vote.`);
  };

  const handleAddPoll = (question, category) => {
    setPolls([...polls, { question, category }]);
    setVotes([...votes, null]);
    setBetValues([...betValues, '']);
    setTotalBets([...totalBets, { yes: 0, no: 0 }]);
  };

  const openModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const openCreatePollModal = () => {
    setIsCreatePollModalOpen(true);
  };

  const closeCreatePollModal = () => {
    setIsCreatePollModalOpen(false);
  };

  return (
    <div>
      <AppHero title="Dashboard" subtitle="Manage and participate in polls effectively." />
      <div className="container mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          {polls.map((poll, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg bg-gray-50 shadow-lg p-6 flex flex-col justify-between"
            >
              <p
                className="text-lg font-semibold mb-4 text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => openModal(poll.question)}
              >
                {poll.question}
              </p>
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => handleVote(index, 'Yes')}
                  className={`px-4 py-2 rounded-lg text-lg font-semibold transition-colors duration-300 ${votes[index] === 'Yes' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-green-300'}`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleVote(index, 'No')}
                  className={`px-4 py-2 rounded-lg text-lg font-semibold transition-colors duration-300 ${votes[index] === 'No' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-red-300'}`}
                >
                  No
                </button>
              </div>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="number"
                  value={betValues[index]}
                  onChange={(e) => handleBetChange(index, e.target.value)}
                  placeholder="Enter bet amount"
                  className="px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <button
                  onClick={() => handlePlaceBet(index)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:bg-blue-700 hover:scale-105"
                >
                  Place Bet
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
  onClick={openCreatePollModal}
  className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:bg-green-700 hover:scale-105 z-50"
>
  Create New Poll
</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        question={selectedQuestion}
      />

      <CreatePollModal
        isOpen={isCreatePollModalOpen}
        onClose={closeCreatePollModal}
        onCreatePoll={handleAddPoll}
      />
    </div>
  );
}
