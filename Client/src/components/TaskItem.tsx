interface TaskItemProps {
  task: {
    id: number;
    title: string;
    isCompleted: boolean;
    createdAt: string;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const createdDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 ${
      task.isCompleted 
        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900' 
        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(task.id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-300 ${
              task.isCompleted
                ? 'bg-green-600 border-green-600 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400'
            }`}
          >
            {task.isCompleted && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-medium transition-colors duration-300 ${
              task.isCompleted
                ? 'text-gray-500 dark:text-gray-400 line-through'
                : 'text-gray-900 dark:text-white'
            }`}>
              {task.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Created: {createdDate}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
            task.isCompleted
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
          }`}>
            {task.isCompleted ? 'Completed' : 'Pending'}
          </span>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
