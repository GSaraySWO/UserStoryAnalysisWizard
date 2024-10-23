import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoryStore } from '../../store/story-store';
import { Download } from 'lucide-react';
import Button from '../../components/Button';

export default function TestDetails() {
  const navigate = useNavigate();
  const currentStory = useStoryStore((state) => state.currentStory);
  const [details, setDetails] = useState('');

  const handleSave = () => {
    // Save implementation
    navigate('/');
  };

  const handleExport = () => {
    const blob = new Blob([details], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-details.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Test Details</h2>
        <p className="text-gray-600">
          Review and edit the detailed test information below.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={10}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}