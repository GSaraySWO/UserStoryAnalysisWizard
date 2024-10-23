import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Button from '../../components/Button';

const steps = [
  { path: 'story', label: 'User Story' },
  { path: 'test-cases', label: 'Generated Tests' },
  { path: 'selection', label: 'Test Selection' },
  { path: 'details', label: 'Test Details' },
];

export default function WizardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.path}
                className={`flex-1 ${
                  index < steps.length - 1 ? 'relative' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 -right-full w-full h-0.5 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
                <p
                  className={`mt-2 text-sm ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}