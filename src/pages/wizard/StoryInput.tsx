import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoryStore } from '../../store/story-store';
import { useAuthStore } from '../../store/auth-store';
import { Upload } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function StoryInput() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { addStory, currentStory, updateStory } = useStoryStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentStory) {
      setTitle(currentStory.title);
      setContent(currentStory.content);
    }
  }, [currentStory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (currentStory) {
      updateStory(currentStory.id, {
        title,
        content,
        document: file?.name || currentStory.document,
      });
    } else {
      addStory({
        title,
        content,
        userId: user.id,
        userName: user.name,
        document: file?.name,
        testCases: [],
      });
    }

    navigate('/wizard/test-cases');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="User Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          User Story Description
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Attach Document (Optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">DOC, DOCX up to 10MB</p>
          </div>
        </div>
        {(file || currentStory?.document) && (
          <p className="text-sm text-gray-500 mt-2">
            Selected: {file?.name || currentStory?.document}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Analyze</Button>
      </div>
    </form>
  );
}