import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoryStore } from '../../store/story-store';
import { Check } from 'lucide-react';
import Button from '../../components/Button';

const exampleTestCases = [
  { id: '1', title: 'User can successfully submit the form with valid data' },
  { id: '2', title: 'System validates required fields and shows error messages' },
  { id: '3', title: 'User can upload and attach supporting documents' },
  { id: '4', title: 'Form data is properly saved in the database' },
  { id: '5', title: 'User receives confirmation email after submission' },
];

export default function TestSelection() {
  const navigate = useNavigate();
  const currentStory = useStoryStore((state) => state.currentStory);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const testCases = currentStory?.testCases.length
    ? currentStory.testCases.map(tc => ({ id: tc.id, title: tc.description.split(': ')[1] }))
    : exampleTestCases;

  const handleViewDetails = () => {
    if (selectedTests.length > 0) {
      navigate('/wizard/details');
    }
  };

  const toggleTest = (id: string) => {
    setSelectedTests(prev =>
      prev.includes(id)
        ? prev.filter(testId => testId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Select Test Cases
        </h2>
        <p className="text-gray-600">
          Choose one or more test cases to view detailed information.
        </p>
      </div>

      <div className="space-y-2">
        {testCases.map((testCase) => (
          <button
            key={testCase.id}
            onClick={() => toggleTest(testCase.id)}
            className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
              selectedTests.includes(testCase.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
              selectedTests.includes(testCase.id)
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}>
              {selectedTests.includes(testCase.id) && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="flex-grow text-left text-gray-900">
              {testCase.title}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-600">
          {selectedTests.length} test case{selectedTests.length !== 1 ? 's' : ''} selected
        </p>
        <Button
          onClick={handleViewDetails}
          disabled={selectedTests.length === 0}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}