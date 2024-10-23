import { useNavigate } from 'react-router-dom';
import { useStoryStore } from '../store/story-store';
import { useAuthStore } from '../store/auth-store';
import { PlusCircle, LogOut, Edit } from 'lucide-react';
import Button from '../components/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const stories = useStoryStore((state) => state.stories);
  const setCurrentStory = useStoryStore((state) => state.setCurrentStory);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleEditStory = (story: (typeof stories)[0]) => {
    setCurrentStory(story);
    navigate('/wizard/story');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Story Analysis</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <Button
              variant="outline"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Analyzed User Stories
          </h2>
          <Button onClick={() => navigate('/wizard/story')}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>

        <div className="bg-white shadow rounded-lg">
          {stories.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No user stories analyzed yet. Start by creating a new analysis.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {stories.map((story) => (
                <li key={story.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {story.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Analyzed by {story.userName}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-500">
                        {new Date(story.createdAt).toLocaleDateString()}
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => handleEditStory(story)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}