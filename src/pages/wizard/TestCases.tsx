import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoryStore } from '../../store/story-store';
import Button from '../../components/Button';
import db from '../../lib/db';

const initialTestCases = `Test Case 1: Verify user can submit form with valid inputs
- Steps:
  1. Navigate to form page
  2. Fill in all required fields
  3. Click submit button
- Expected Result: Form should be submitted successfully

Test Case 2: Verify form validation for empty fields
- Steps:
  1. Navigate to form page
  2. Leave required fields empty
  3. Click submit button
- Expected Result: Error messages should be displayed for empty fields

Test Case 3: Verify maximum character limit validation
- Steps:
  1. Navigate to form page
  2. Enter text exceeding maximum length in text fields
  3. Click submit button
- Expected Result: Error messages should indicate character limit exceeded`;

export default function TestCases() {
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState(initialTestCases);
  const currentStory = useStoryStore((state) => state.currentStory);
  const updateStory = useStoryStore((state) => state.updateStory);

  const handleContinue = () => {
    if (currentStory) {
      // Parse test cases text into structured format
      const parsedTestCases = testCases.split('\n\n').map((testCase, index) => ({
        id: String(index + 1),
        description: testCase.split('\n')[0],
        steps: testCase
          .split('- Steps:\n')[1]
          ?.split('\n- Expected')[0]
          .split('\n')
          .map((step) => step.trim().replace(/^\d+\.\s/, ''))
          .filter(Boolean) || [],
        expectedResult: testCase.split('Expected Result: ')[1] || '',
      }));

      updateStory(currentStory.id, {
        testCases: parsedTestCases,
      });

      db.update('stories', { testCases: parsedTestCases }, { id: currentStory.id });
    }
    navigate('/wizard/selection');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Generated Test Cases
        </h2>
        <p className="text-gray-600">
          Review and edit the automatically generated test cases below. Each test case should include a description, steps, and expected result.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={testCases}
          onChange={(e) => setTestCases(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={20}
          placeholder="Enter test cases here..."
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
